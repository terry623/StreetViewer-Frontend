import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { log_in, show_message } from 'states/account-actions.js';
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
            temp_username: "",
            temp_password: "",
            open: true,
            open_success: true
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.handleRequestClose_success = this.handleRequestClose_success.bind(this);
    }

    handleRequestClose() {
        this.setState({ open: false });
        this.props.dispatch(show_message("Nothing Happen"));
    }

    handleRequestClose_success() {
        this.setState({ open: false });
        this.setState({ temp_username: "", temp_password: "" });
        this.props.dispatch(show_message("Nothing Happen"));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.message === "Nothing Happen") this.setState({ open: true });
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
                >
                    <Grid item>
                        <h3>Welcome!</h3>
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
                                value={this.state.temp_username}
                                disableUnderline={true}
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
                                value={this.state.temp_password}
                                type='password'
                                disableUnderline={true}
                                onChange={event => this.setState({ temp_password: event.target.value })}
                            />
                        </Grid>
                    </Grid>

                    <Grid item className='submit'>
                        <Button raised color="accent" onClick={this.handleLogin}>
                            LOG IN
                        </Button>
                    </Grid>

                </Grid>

                {message === "Wrong Account or Password!" &&
                    <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
                        <DialogTitle>{"Wrong Account or Password!"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Please check it again!
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleRequestClose} color="primary">
                                Got it!
                            </Button>
                        </DialogActions>
                    </Dialog>
                }

                {message === "Finish Log In!" &&
                    <Dialog open={this.state.open} onRequestClose={this.handleRequestClose_success}>
                        <DialogTitle>{"Log In Success!"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Go to Camera!
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleRequestClose_success} color="primary">
                                Got it!
                            </Button>
                        </DialogActions>
                    </Dialog>
                }

            </div >
        );
    }

    handleLogin() {
        this.props.dispatch(log_in(this.state.temp_username, this.state.temp_password));
    }

}

export default connect(state => state.account)(LogIn);
