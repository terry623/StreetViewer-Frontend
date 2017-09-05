import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { sign_up, show_message } from 'states/account-actions.js';
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

import './SignUp.css';

class SignUp extends React.Component {
    static propTypes = {
        message: PropTypes.string,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            temp_username: "",
            temp_password: "",
            temp_password_2: "",
            open: true
        };

        this.handleSignup = this.handleSignup.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.handleRequestClose_success = this.handleRequestClose_success.bind(this);
    }

    handleRequestClose() {
        this.setState({ open: false });
        this.props.dispatch(show_message("Nothing Happen"));
    }

    handleRequestClose_success() {
        this.setState({ open: false });
        this.setState({ temp_username: "", temp_password: "", temp_password_2: "" });
        this.props.dispatch(show_message("Nothing Happen"));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.message === "Nothing Happen") this.setState({ open: true });
    }

    render() {
        const { message } = this.props;

        return (
            <div className='signup'>

                <Grid
                    container
                    align='center'
                    direction='column'
                    justify='center'
                >
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
                            <AccountcircleIcon className='sign_up_icon' />
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
                            <LockIcon className='sign_up_icon' />
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

                    <Grid
                        container
                        align='center'
                        direction='row'
                        justify='center'
                        className='password_2'
                    >
                        <Grid item>
                            <LockIcon className='sign_up_icon' />
                        </Grid>
                        <Grid item>
                            <Input
                                placeholder='Password Again'
                                value={this.state.temp_password_2}
                                type='password'
                                disableUnderline={true}
                                onChange={event => this.setState({ temp_password_2: event.target.value })}
                            />
                        </Grid>
                    </Grid>

                    <Grid item className='submit'>
                        <Button raised color="accent" onClick={this.handleSignup}>
                            Sign Up
                        </Button>
                    </Grid>

                </Grid>

                {message === "Account Exist!" &&
                    <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
                        <DialogTitle>{"Account Exist"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Please try another account!
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleRequestClose} color="primary">
                                Got it!
                            </Button>
                        </DialogActions>
                    </Dialog>
                }

                {message === "Two input password must be consistent!" &&
                    <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
                        <DialogTitle>{"Two input password must be consistent"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Please input correct password!
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleRequestClose} color="primary">
                                Got it!
                            </Button>
                        </DialogActions>
                    </Dialog>
                }

                {message === "Finish Sign Up!" &&
                    <Dialog open={this.state.open} onRequestClose={this.handleRequestClose_success}>
                        <DialogTitle>{"Sign Up Success!"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Go to Log In!
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleRequestClose_success} color="primary">
                                Got it!
                            </Button>
                        </DialogActions>
                    </Dialog>
                }

            </div>
        );
    }

    handleSignup() {
        if (this.state.temp_password !== this.state.temp_password_2) {
            this.props.dispatch(show_message("Two input password must be consistent!"));
        } else {
            this.props.dispatch(sign_up(this.state.temp_username, this.state.temp_password));
        }
    }
}

export default connect(state => state.account)(SignUp);