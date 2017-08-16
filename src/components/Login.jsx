import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';

import './LogIn.css';

class LogIn extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            temp_account: null
        };
    }

    render() {
        const { account, password } = this.props;

        return (
            <div className='login'>
                <h3>Log In!</h3>
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
                />

                <h1>{this.state.temp_account}</h1>
            </div>
        );
    }

}

export default connect(state => state.account)(LogIn);
