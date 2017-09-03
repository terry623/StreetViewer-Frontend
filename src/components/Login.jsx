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
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';

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
            temp_password: null,
            open: false,
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }

    handleRequestClose = () => {
        this.setState({ open: false });
        //need to clear message, else it will render and setstate again
    };

    render() {
        const { message } = this.props;

        return (
            <div className='login'>

                {message === "Wrong Account or Password!" && this.setState({ open: true })}

                <Grid
                    container
                    align='center'
                    direction='column'
                    justify='center'
                >
                    <h4>{message}</h4>

                    <Grid item>
                        <h3>Join Us!</h3>
                    </Grid>

                    <Grid
                        container
                        align='center'
                        direction='row'
                        justify='center'
                        className='username'
                    >
                        <Grid item>
                            <AccountcircleIcon className='log_in_icon' />
                        </Grid>
                        <Grid item>
                            <Input
                                placeholder='Username'
                                disableUnderline='true'
                                onChange={event => this.setState({ temp_username: event.target.value })}
                            />
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        align='center'
                        direction='row'
                        justify='center'
                        className='password'
                    >
                        <Grid item>
                            <LockIcon className='log_in_icon' />
                        </Grid>
                        <Grid item>
                            <Input
                                placeholder='Password'
                                type='password'
                                disableUnderline='true'
                                onChange={event => this.setState({ temp_username: event.target.value })}
                            />
                        </Grid>
                    </Grid>

                    <Grid item className='submit'>
                        <Button raised color="accent" onClick={this.handleLogin}>
                            LOG IN
                        </Button>
                    </Grid>
                    <Grid item className='msg'>
                        Not a member ? <a href="#">Sign up now</a>
                    </Grid>
                </Grid>


                <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
                    <DialogTitle>{"Use Google's location service?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Let Google help apps determine location. This means sending anonymous location data to
                            Google, even when no apps are running.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleRequestClose} color="primary">
                            Got it!
                    </Button>
                    </DialogActions>
                </Dialog>

            </div >


        );
    }

    handleLogin() {
        this.props.dispatch(log_in(this.state.temp_username, this.state.temp_password));
    }

}

export default connect(state => state.account)(LogIn);
