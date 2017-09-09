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
import { CircularProgress } from 'material-ui/Progress';
import CameraIcon from 'material-ui-icons/CameraAlt';

import './Chat.css';

import io from 'socket.io-client';
import Button from 'material-ui/Button';
import { store_socket_id, get_target_socket_id } from 'api/chat.js';
import { select_friend } from 'states/chat-actions.js';

var socket = io.connect('http://localhost:8080', { reconnect: true });

class Chat extends React.Component {
	static propTypes = {
		select_friend: PropTypes.string,
		time: PropTypes.number,
		dispatch: PropTypes.func
	};

	constructor(props) {
		super(props);

		this.state = {
			travel_time: 0,
			sender: "",
			receive_msg: "",
			send_msg: "",
			friends: null,
			open: false,
			open_send: false,
			start_timer: false,
			open_time: false
		};

		this.change_msg = this.change_msg.bind(this);
		this.change_sender = this.change_sender.bind(this);
		this.handleReply = this.handleReply.bind(this);
		this.handleRequestClose_msg = this.handleRequestClose_msg.bind(this);
		this.handleRequestClose_send = this.handleRequestClose_send.bind(this);
		this.handleRequestClose_time = this.handleRequestClose_time.bind(this);
		this.handleSend = this.handleSend.bind(this);

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

	change_msg(msg) {
		this.setState({ receive_msg: msg });
	}

	change_sender(sender) {
		this.setState({ sender: sender });
	}

	handleRequestClose_msg = (event, reason) => {
		if (reason === 'clickaway') return;
		this.setState({ open: false });
	}

	handleRequestClose_send = (event, reason) => {
		if (reason === 'clickaway') return;
		this.setState({ open_send: false });
		this.props.dispatch(select_friend(""));
	}

	handleRequestClose_time = (event, reason) => {
		if (reason === 'clickaway') return;
		this.setState({ open_time: false });
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.receive_msg !== this.state.receive_msg) {
			this.setState({ open: true });
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.select_friend !== this.props.select_friend) this.setState({ open_send: true });
		if (nextProps.time !== 0 && this.state.start_timer === false) {
			this.setState({ travel_time: nextProps.time, start_timer: true });
			this.timer_id = setInterval(
				() => this.timer(),
				60000
			);
		}
	}

	componentWillUnmount() {
		clearInterval(this.timer_id);
	}

	timer() {
		this.setState({
			travel_time: this.state.travel_time + 1,
			open_time: true
		});
	}

	render() {

		var complete_receive_msg = this.state.sender + " : " + this.state.receive_msg;
		var complete_send_title = "To " + this.props.select_friend + " :";
		var complete_time = "You have " + (100 - this.state.travel_time) + " minutes left to finish your trip";

		return (
			<div className='Chat' ref="myRef">
				<Snackbar
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'left',
					}}
					key="snack_time"
					autoHideDuration={5000}
					onRequestClose={this.handleRequestClose_time}
					open={this.state.open_time}
					SnackbarContentProps={{
						'aria-describedby': 'time_id',
					}}
					message={<span id="time_id">{complete_time}</span>}
				/>
				{this.state.receive_msg !== "" &&
					<Snackbar
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right',
						}}
						key="snack_msg"
						open={this.state.open}
						onRequestClose={this.handleRequestClose_msg}
						SnackbarContentProps={{
							'aria-describedby': 'received_message_id',
						}}
						message={<span id="received_message_id">{complete_receive_msg}</span>}
						action={[
							<Button key="reply" color="accent" className="reply_button" dense onClick={this.handleReply}>
								REPLY
            				</Button>,
							<IconButton
								key="close_1"
								aria-label="Close"
								color="inherit"
								className="close_button"
								onClick={this.handleRequestClose_msg}
							>
								<CloseIcon />
							</IconButton>
						]}
					/>
				}

				{this.props.select_friend !== "" &&
					<Snackbar
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right',
						}}
						key="snack_send"
						open={this.state.open_send}
						onRequestClose={this.handleRequestClose_send}
						SnackbarContentProps={{
							'aria-describedby': 'send_title_id',
						}}
						message={<span id="send_title_id">{complete_send_title}</span>}
						action={[
							<Input
								key="input"
								placeholder='message'
								disableUnderline={true}
								className='send_input'
								onChange={event => this.setState({ send_msg: event.target.value })}
							/>,
							<Button key="send" color="accent" className="send_button" dense onClick={this.handleSend}>
								SEND
            				</Button>,
							<IconButton
								key="close_2"
								aria-label="Close"
								color="inherit"
								className="close_button"
								onClick={this.handleRequestClose_send}
							>
								<CloseIcon />
							</IconButton>
						]}
					/>
				}
			</div>
		);
	}

	handleReply() {
		this.props.dispatch(select_friend(this.state.sender));
	}

	handleSend() {
		get_target_socket_id(this.props.select_friend).then(result => {
			socket.emit('chat message', result.socket_id, { sender: this.props.account, msg: this.state.send_msg });
		}).catch(err => {
			console.log("Erro Send Message!");
		});

		this.setState({ open_send: false });
		this.props.dispatch(select_friend(""));
	}

}

export default connect(state => ({
	...state.account,
	...state.chat,
	...state.camera
}))(Chat);
