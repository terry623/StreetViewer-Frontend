import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { sign_up } from 'states/account-actions.js';

import './SignUp.css';

class SignUp extends React.Component {
    static propTypes = {
        infor:PropTypes.string,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            temp_username: null,
            temp_password: null
        };

        this.handleSignup = this.handleSignup.bind(this);
    }

    render() {
        const { infor } = this.props;

        return (
            <div className='signup'>
                <h3>Sign Up!</h3>
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
                <Button raised onClick={this.handleSignup}>
                    Submit
                </Button>
                <br />

                <h3>{infor}</h3>

            </div>
        );
    }

    handleSignup() {
        this.props.dispatch(sign_up(this.state.temp_username, this.state.temp_password));
    }
}

export default connect(state => state.account)(SignUp);