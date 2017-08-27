import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';

import './StreetView.css';

import io from 'socket.io-client';
import Button from 'material-ui/Button';

var socket = io.connect('http://localhost:8080', { reconnect: true });

class Chat extends React.Component {
	static propTypes = {
		dispatch: PropTypes.func
	};

	constructor(props) {
		super(props);

		this.state = {
			send_msg: null,
			receive_msg: null
		};

		this.handleSend = this.handleSend.bind(this);

		socket.on('chat message', (id, msg) => {
			console.log(socket.id);
		});
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
		socket.emit('chat message', socket.id, this.state.send_msg);
	}
}

export default connect(state => ({
	...state.camera,
	...state.account
}))(Chat);
