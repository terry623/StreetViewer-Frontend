import React from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import { connect } from 'react-redux';
import './Main.css';

import LogIn from 'components/LogIn.jsx';
import SignUp from 'components/SignUp.jsx';
import Camera from 'components/Camera.jsx';
import Collection from 'components/Collection.jsx';

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
import Input from 'material-ui/Input/Input';

import { log_out } from 'states/account-actions.js';
import { select_friend } from 'states/chat-actions.js';

const emails = ['username@gmail.com', 'user02@gmail.com'];

class Main extends React.Component {
    static propTypes = {
        account: PropTypes.string,
        store: PropTypes.object,
        friends: PropTypes.array,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            open_menu: false,
            anchorEl_menu: undefined,
            open_contact: false
        };

        this.handle_click_menu = this.handle_click_menu.bind(this);
        this.handleRequestClose_menu = this.handleRequestClose_menu.bind(this);
        this.handleRequestClose_menu_logout = this.handleRequestClose_menu_logout.bind(this);
        this.handleRequestClose_contact = this.handleRequestClose_contact.bind(this);
    }

    handle_click_menu = event => {
        this.setState({ open_menu: true, anchorEl_menu: event.currentTarget });
    }

    handleRequestClose_menu = () => {
        this.setState({ open_menu: false });
    }

    handleRequestClose_menu_logout = () => {
        this.setState({ open_menu: false });
        this.props.dispatch(log_out());
    }

    handleRequestClose_contact = value => {
        this.setState({ open_contact: false });
        if (value) this.props.dispatch(select_friend(value));
    };

    render() {

        const { account, friends } = this.props;

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
                            {friends.length !== 0 &&
                                <Badge
                                    badgeContent={friends.length}
                                    color='primary'
                                    className='person'
                                >
                                    <IconButton
                                        aria-owns={this.state.open_contact ? 'contact' : null}
                                        aria-haspopup="true"
                                        onClick={() => this.setState({ open_contact: true })}
                                        className='contact_icon_1'
                                    >
                                        <PersonIcon />
                                    </IconButton>
                                </Badge>
                            }

                            {friends.length === 0 &&
                                <IconButton
                                    className='contact_icon_2'
                                >
                                    <PersonIcon />
                                </IconButton>
                            }

                            <IconButton
                                aria-owns={this.state.open_menu ? 'menu' : null}
                                aria-haspopup="true"
                                onClick={this.handle_click_menu}
                                className='menu_icon'
                            >
                                <MenuIcon />
                            </IconButton>

                        </Grid>

                        {account !== "" &&
                            <SimpleDialog
                                open={this.state.open_contact}
                                onRequestClose={this.handleRequestClose_contact}
                                friends={friends}
                                account={account}
                            />}

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
                            <MenuItem onClick={this.handleRequestClose_menu_logout} component={Link} to={'/LogIn'}>Log Out</MenuItem>
                        </Menu>

                    </div>

                    <Route exact path="/" render={() => (
                        <LogIn />
                    )} />

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

    static propTypes = {
        account: PropTypes.string,
        friends: PropTypes.array
    };

    constructor(props) {
        super(props);

        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.handleListItemClick = this.handleListItemClick.bind(this);
    }

    handleRequestClose = () => {
        this.props.onRequestClose();
    };

    handleListItemClick(client_1, client_2) {
        var current_target;

        if (client_1 !== this.props.account) current_target = client_1;
        else if (client_2 !== this.props.account) current_target = client_2;
        this.props.onRequestClose(current_target);
    };

    render() {
        const { onRequestClose, friends, account, ...other } = this.props;

        let children = (
            <ListItem>
                <ListItemText primary={"You have no friends"} />
            </ListItem>
        );

        if (friends.length) {
            children = friends.map(result => (

                <ListItem button onClick={() => this.handleListItemClick(result.client_1, result.client_2)} key={result.id}>
                    <ListItemAvatar>
                        <Avatar>
                            {(result.distance + 1).toString()}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={(result.client_1 !== account && result.client_1) || (result.client_2 !== account && result.client_2)} />
                </ListItem>
            ));
        }

        return (
            <Dialog onRequestClose={this.handleRequestClose} {...other}>
                <DialogTitle>Friends around you</DialogTitle>
                <List>
                    {children}
                </List>
            </Dialog>
        );
    }
}

export default connect(state => ({
    ...state.camera,
    ...state.account,
    ...state.chat
}))(Main);