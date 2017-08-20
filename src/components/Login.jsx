import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { log_in } from 'states/account-actions.js';

import './LogIn.css';

class LogIn extends React.Component {
    static propTypes = {
        message: PropTypes.string,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            temp_username: null,
            temp_password: null
        };

        this.handleLogin = this.handleLogin.bind(this);
    }

    render() {
        const { message } = this.props;

        return (
            <div className='login'>
                <h3>Log In!</h3>
                <h4>{message}</h4>
                <br />
                <TextField
                    className='username'
                    label='Username'
                    onChange={event => this.setState({ temp_username: event.target.value })}
                />
                <br />
                <TextField
                    className='password'
                    label='Password'
                    type='password'
                    onChange={event => this.setState({ temp_password: event.target.value })}
                />
                <br />
                <Button raised onClick={this.handleLogin}>
                    Submit
                </Button>
                <br />

            </div>
        );
    }

    handleLogin() {
        this.props.dispatch(log_in(this.state.temp_username, this.state.temp_password));
    }

}

export default connect(state => state.account)(LogIn);
