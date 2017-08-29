import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';

import './StreetView.css';

import io from 'socket.io-client';
import Button from 'material-ui/Button';
import { store_socket_id, get_target_socket_id } from 'api/chat.js';

var socket = io.connect('http://localhost:8080', { reconnect: true });


class Chat extends React.Component {
	static propTypes = {
		friends: PropTypes.array,
		dispatch: PropTypes.func
	};

	constructor(props) {
		super(props);

		this.state = {
			sender: "",
			send_target: "",
			send_msg: "",
			receive_msg: "",
			friends: null
		};

		this.change_msg = this.change_msg.bind(this);
		this.change_sender = this.change_sender.bind(this);
		this.handleSend = this.handleSend.bind(this);
		this.handle_send_target = this.handle_send_target.bind(this);

		if (this.props.account !== "") {
			store_socket_id(this.props.account, socket.id).then(result => {
				console.log("Store Socket ID Success!");
			}).catch(err => {
				console.log("Error Store Socket ID!");
			});
		}

		socket.on('my message', (receive) => {
			if (this.refs.myRef) {
				this.change_sender(receive.sender);
				this.change_msg(receive.msg);
			}
		});

	}

	render() {

		const { friends } = this.props;

		let children = (
			<div>No friends around you.</div>
		);
		if (friends.length) {
			children = friends.map(result => (
				<Button key={result.id} raised onClick={() => this.handle_send_target(result.client_1, result.client_2)}>
					{result.client_1 !== this.props.account && result.client_1}
					{result.client_2 !== this.props.account && result.client_2}
				</Button>
			));
		}

		return (
			<div className='Chat' ref="myRef">
				<h3>Chat!</h3>
				{children}
				<br />
				<br />
				<br />
				<TextField
					className='target'
					label='Target'
					value={this.state.send_target}
					onChange={event => this.setState({ send_target: event.target.value })}
				/>
				<TextField
					className='message'
					label='Message'
					onChange={event => this.setState({ send_msg: event.target.value })}
				/>
				<br />
				<br />
				<Button raised onClick={this.handleSend}>
					Send
                </Button>
				{this.state.sender !== "" && <h2>{this.state.sender} : <h2>{this.state.receive_msg}</h2></h2>}

			</div>
		);
	}

	change_msg(msg) {
		this.setState({
			receive_msg: msg
		});
	}

	change_sender(sender) {
		this.setState({
			sender: sender
		});
	}

	handleSend() {
		get_target_socket_id(this.state.send_target).then(result => {
			socket.emit('chat message', result.socket_id, { sender: this.props.account, msg: this.state.send_msg });
		}).catch(err => {
			console.log("Erro Send Message!");
		});
	}

	handle_send_target(client_1, client_2) {
		var current_target;
		if (client_1 !== this.props.account) current_target = client_1;
		else if (client_2 !== this.props.account) current_target = client_2;

		this.setState({
			send_target: current_target
		});
	}

}

export default connect(state => ({
	...state.camera,
	...state.account,
	...state.chat
}))(Chat);
