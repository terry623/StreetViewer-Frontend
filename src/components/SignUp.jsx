import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { sign_up } from 'states/account-actions.js';

import './SignUp.css';

class SignUp extends React.Component {
    static propTypes = {
        email: PropTypes.string,
        account: PropTypes.string,
        password: PropTypes.string,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            temp_email: null,
            temp_account: null,
            temp_password: null
        };

        this.handleSignup = this.handleSignup.bind(this);
    }

    render() {
        const { email, account, password } = this.props;

        return (
            <div className='signup'>
                <h3>Sign Up!</h3>
                <br />
                <TextField
                    className='email'
                    label='Email'
                    onChange={event => this.setState({ temp_email: event.target.value })}
                />
                <br />
                <TextField
                    className='account'
                    label='Account'
                    onChange={event => this.setState({ temp_account: event.target.value })}
                />
                <br />
                <TextField
                    className='password'
                    label='Password'
                    type='password'
                    onChange={event => this.setState({ temp_password: event.target.value })}
                />
                <br />
                <Button raised onClick={this.handleSignup}>
                    Submit
                </Button>
                <br />

                Email in DB: {email}<br />
                Account in DB: {account}<br />
                Password in DB: {password}<br />
            </div>
        );
    }

    handleSignup() {
        this.props.dispatch(sign_up(this.state.temp_email, this.state.temp_account, this.state.temp_password));
    }
}

export default connect(state => state.account)(SignUp);