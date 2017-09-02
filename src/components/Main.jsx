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

import Camera from 'components/Camera.jsx';
import Collection from 'components/Collection.jsx';
import LogIn from 'components/LogIn.jsx';

import { log_out } from 'states/account-actions.js';

class Main extends React.Component {
    static propTypes = {
        account: PropTypes.string,
        store: PropTypes.object,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
            open: false
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }

    handleLogout() {
        this.props.dispatch(log_out());
    }

    handleClick = event => {
        this.setState({ open: true, anchorEl: event.currentTarget });
    };

    handleRequestClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <Router>
                <div className='main'>
                    <Grid
                        container
                        align='center'
                        direction='row'
                        justify='flex-end'
                    >

                        <div className='banner'>
                            <Badge badgeContent={4} color="primary">
                                <PersonIcon />
                            </Badge>

                            <IconButton
                                aria-owns={this.state.open ? 'simple-menu' : null}
                                aria-haspopup="true"
                                onClick={this.handleClick}
                            >
                                <MenuIcon />
                            </IconButton>

                            <Menu
                                id='simple-menu'
                                anchorEl={this.state.anchorEl}
                                open={this.state.open}
                                onRequestClose={this.handleRequestClose}
                                className='main_menu'
                            >
                                <MenuItem onClick={this.handleRequestClose} component={Link} to={'/Camera'}>Camera</MenuItem>
                                <MenuItem onClick={this.handleRequestClose} component={Link} to={'/Collection'}>Collection</MenuItem>
                                <MenuItem onClick={this.handleRequestClose} component={Link} to={'/LogIn'}>Log In</MenuItem>
                            </Menu>

                        </div>


                    </Grid>

                    <Route exact path="/Camera" render={() => (
                        <Camera />
                    )} />

                    <Route exact path="/Collection" render={() => (
                        <Collection />
                    )} />

                    <Route exact path="/LogIn" render={() => (
                        <LogIn />
                    )} />

                </div>
            </Router >
        );
    }

}

export default connect(state => ({
    ...state.account
}))(Main);