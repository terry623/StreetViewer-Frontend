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
		dispatch: PropTypes.func
	};

	constructor(props) {
		super(props);

		this.state = {
			send_target: null,
			send_msg: null,
			receive_msg: null
		};

		this.handleSend = this.handleSend.bind(this);

		if (this.props.account !== "") {
			store_socket_id(this.props.account, socket.id).then(result => {
				console.log("Store Socket ID Success!");
			}).catch(err => {
				console.log("Error Store Socket ID!");
			});
		}

		socket.on('my message', (msg) => {
			console.log("my message: " + msg);
			this.change_msg(msg);
		});
	}

	render() {
		return (
			<div className='Chat'>
				<h3>Chat!</h3>
				<br />
				<h2>{this.state.receive_msg}</h2>
				<TextField
					className='target'
					label='Target'
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
			</div>
		);
	}

	change_msg(msg) {
		this.setState({
			receive_msg: msg
		});
	}

	handleSend() {
		get_target_socket_id(this.state.send_target).then(result => {
			socket.emit('chat message', result.socket_id, this.state.send_msg);
		}).catch(err => {
			console.log("Erro Send Message!");
		});
	}

}

export default connect(state => ({
	...state.camera,
	...state.account
}))(Chat);
