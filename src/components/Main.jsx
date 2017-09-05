import React from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import { connect } from 'react-redux';
import './Main.css';
import Menu, { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import PersonIcon from 'material-ui-icons/Person';
import Grid from 'material-ui/Grid';
import Badge from 'material-ui/Badge';
import Avatar from 'material-ui/Avatar';
import CommentIcon from 'material-ui-icons/Comment';
import List, { ListItem, ListItemAvatar, ListItemText } from 'material-ui/List';
import Dialog, { DialogTitle } from 'material-ui/Dialog';

import Camera from 'components/Camera.jsx';
import Collection from 'components/Collection.jsx';
import LogIn from 'components/LogIn.jsx';
import SignUp from 'components/SignUp.jsx';

import { log_out } from 'states/account-actions.js';

const emails = ['username@gmail.com', 'user02@gmail.com'];

class Main extends React.Component {
    static propTypes = {
        account: PropTypes.string,
        store: PropTypes.object,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            open_menu: false,
            anchorEl_menu: undefined,
            open_contact: false,
            anchorEl_contact: undefined,
            selectedValue: emails[1]
        };

        this.handle_click_menu = this.handle_click_menu.bind(this);
        this.handle_click_contact = this.handle_click_contact.bind(this);
        this.handleRequestClose_menu = this.handleRequestClose_menu.bind(this);
        this.handleRequestClose_contact = this.handleRequestClose_contact.bind(this);
    }

    handleLogout() {
        this.props.dispatch(log_out());
    }

    handle_click_menu = event => {
        this.setState({ open_menu: true, anchorEl_menu: event.currentTarget });
    }

    handle_click_contact = event => {
        this.setState({ open_contact: true, anchorEl_contact: event.currentTarget });
    }

    handleRequestClose_menu = () => {
        this.setState({ open_menu: false });
    }

    handleRequestClose_contact = value => {
        this.setState({ selectedValue: value, open_contact: false });
    };

    render() {

        const { friends } = this.props;

        // let children = (
        //     <div>No friends around you.</div>
        // );
        // if (friends.length) {
        //     children = friends.map(result => (
        //         <MenuItem key={result.id} onClick={this.handleRequestClose_contact}>
        //             <Avatar>
        //                 {result.distance.toString()}
        //             </Avatar>
        //             {(result.client_1 !== this.props.account && result.client_1) || (result.client_2 !== this.props.account && result.client_2)}
        //             <IconButton
        //                 onClick={() => this.handle_send_target(result.client_1, result.client_2)}
        //             >
        //                 <CommentIcon />
        //             </IconButton>
        //         </MenuItem>
        //     ));
        // }

        return (
            <Router>
                <div className='main'>

                    <div className='banner'>

                        <Grid
                            container
                            align='flex-start'
                            direction='row'
                            justify='flex-end'
                        >
                            <Badge
                                badgeContent={friends.length}
                                color='primary'
                                className='person'
                            >
                                <IconButton
                                    aria-owns={this.state.open_contact ? 'contact' : null}
                                    aria-haspopup="true"
                                    onClick={() => this.setState({ open_contact: true })}
                                    className='contact_icon'
                                >
                                    <PersonIcon />
                                </IconButton>
                            </Badge>

                            <IconButton
                                aria-owns={this.state.open_menu ? 'menu' : null}
                                aria-haspopup="true"
                                onClick={this.handle_click_menu}
                                className='menu_icon'
                            >
                                <MenuIcon />
                            </IconButton>

                        </Grid>

                        <SimpleDialog
                            selectedValue={this.state.selectedValue}
                            open={this.state.open_contact}
                            onRequestClose={this.handleRequestClose_contact}
                        />

                        <Menu
                            id='menu'
                            anchorEl={this.state.anchorEl_menu}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                            open={this.state.open_menu}
                            onRequestClose={this.handleRequestClose_menu}
                            className='main_menu'
                        >
                            <MenuItem onClick={this.handleRequestClose_menu} component={Link} to={'/Camera'}>Camera</MenuItem>
                            <MenuItem onClick={this.handleRequestClose_menu} component={Link} to={'/Collection'}>Collection</MenuItem>
                            <MenuItem onClick={this.handleRequestClose_menu} component={Link} to={'/LogIn'}>Log In</MenuItem>
                            <MenuItem onClick={this.handleRequestClose_menu} component={Link} to={'/SignUp'}>SignUp</MenuItem>
                        </Menu>

                    </div>

                    <Route exact path="/Camera" render={() => (
                        <Camera />
                    )} />

                    <Route exact path="/Collection" render={() => (
                        <Collection />
                    )} />

                    <Route exact path="/LogIn" render={() => (
                        <LogIn />
                    )} />

                    <Route exact path="/SignUp" render={() => (
                        <SignUp />
                    )} />

                </div>
            </Router >
        );
    }
}

class SimpleDialog extends React.Component {

    handleRequestClose = () => {
        this.props.onRequestClose(this.props.selectedValue);
    };

    handleListItemClick = value => {
        this.props.onRequestClose(value);
    };

    render() {
        const { onRequestClose, selectedValue, ...other } = this.props;

        return (
            <Dialog onRequestClose={this.handleRequestClose} {...other}>
                <DialogTitle>Friends around you</DialogTitle>
                <div>
                    <List>
                        {emails.map(email => (
                            <ListItem button onClick={() => this.handleListItemClick(email)} key={email}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <PersonIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={email} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Dialog>
        );
    }
}

export default connect(state => ({
    ...state.camera,
    ...state.account,
    ...state.chat
}))(Main);