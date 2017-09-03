import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { log_in } from 'states/account-actions.js';
import Input from 'material-ui/Input/Input';
import Grid from 'material-ui/Grid';

import AccountcircleIcon from 'material-ui-icons/Accountcircle';
import LockIcon from 'material-ui-icons/Lock';

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

                <Grid
                    container
                    align='center'
                    direction='column'
                    justify='center'
                    spacing={24}
                >

                    <h4>{message}</h4>

                    <Grid item>
                        <h3>Log In!</h3>
                    </Grid>
                    <Grid item className='username'>
                        <AccountcircleIcon />
                        <Input
                            placeholder='Username'
                            disableUnderline='true'
                            onChange={event => this.setState({ temp_username: event.target.value })}
                        />
                    </Grid>
                    <Grid item className='password'>
                        <LockIcon />
                        <Input
                            placeholder='Password'
                            type='password'
                            disableUnderline='true'
                            onChange={event => this.setState({ temp_username: event.target.value })}
                        />
                    </Grid>
                    <Grid item>
                        <Button className='submit' raised onClick={this.handleLogin}>
                            LOG IN
                        </Button>
                    </Grid>
                    <Grid item>
                        Not a member? Sign up now
                    </Grid>
                </Grid>
            </div >
        );
    }

    handleLogin() {
        this.props.dispatch(log_in(this.state.temp_username, this.state.temp_password));
    }

}

export default connect(state => state.account)(LogIn);
