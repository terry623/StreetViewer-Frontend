import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import Input from 'material-ui/Input/Input';

import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';

import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FaceIcon from 'material-ui-icons/Face';
import Grid from 'material-ui/Grid';

import './StreetView.css';

import io from 'socket.io-client';
import Button from 'material-ui/Button';
import { store_socket_id, get_target_socket_id } from 'api/chat.js';

var socket = io.connect('http://localhost:8080', { reconnect: true });

class Chat extends React.Component {
	static propTypes = {
		select_friend: PropTypes.string,
		dispatch: PropTypes.func
	};

	constructor(props) {
		super(props);

		this.state = {
			sender: "",
			send_msg: "",
			receive_msg: "",
			friends: null,
			open: false,
			open_send: true
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

	handleRequestClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		this.setState({ open: false });
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.receive_msg !== this.state.receive_msg) {
			this.setState({ open: true });
		}
	}

	render() {

		var complete_msg = this.state.sender + " : " + this.state.receive_msg;

		return (
			<div className='Chat' ref="myRef">
				{/* <TextField
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
                </Button> */}

				<Snackbar
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'right',
					}}
					open={this.state.open}
					autoHideDuration={6e3}
					onRequestClose={this.handleRequestClose}
					message={complete_msg}
					action={[
						<Button key="undo" color="accent" dense onClick={this.handleRequestClose}>
							REPLY
            			</Button>,
						<IconButton
							key="close"
							aria-label="Close"
							color="inherit"
							onClick={this.handleRequestClose}
						>
							<CloseIcon />
						</IconButton>
					]}
				/>

				<Snackbar
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'right',
					}}
					open={this.state.open_send}
					onRequestClose={this.handleRequestClose}
					message={"To" + this.props.select_friend + " : "}
					action={[
						<Input
							placeholder='message'
							disableUnderline={true}
							onChange={event => this.setState({ send_msg: event.target.value })}
						/>,
						<Button key="undo" color="accent" dense onClick={this.handleRequestClose}>
							SEND
            			</Button>,
						<IconButton
							key="close"
							aria-label="Close"
							color="inherit"
							onClick={this.handleRequestClose}
						>
							<CloseIcon />
						</IconButton>
					]}
				/>
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
