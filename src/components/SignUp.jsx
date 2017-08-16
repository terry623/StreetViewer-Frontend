import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';

import './SignUp.css';

class SignUp extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='signup'>
                <h3>Sign Up!</h3>
                <br />
                <TextField
                    className='email'
                    label='Email'
                />
                <br />
                <TextField
                    className='account'
                    label='Account'
                />
                <br />
                <TextField
                    className='password'
                    label='Password'
                    type='password'
                />
            </div>
        );
    }
}

export default connect(state => state.account)(SignUp);