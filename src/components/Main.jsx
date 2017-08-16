import React from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button
} from 'reactstrap';
import { connect } from 'react-redux';

import Collection from 'components/Collection.jsx';
import Camera from 'components/Camera.jsx';
import SignUp from 'components/SignUp.jsx';
import Login from 'components/Login.jsx';

import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

import './Main.css';


class Main extends React.Component {
    static propTypes = {
        store: PropTypes.object,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div className='main'>
                    <div className='container'>
                        <Navbar color='faded' light toggleable>
                            <NavbarBrand className='text-info' href="/">Photo Exhibition</NavbarBrand>
                            <Nav className="ml-auto">
                                <NavItem>
                                    <NavLink tag={Link} to='/'>Camera</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} to='/Collection'>Collection</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} to='/SigeUp'>SigeUp</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} to='/Login'>Login</NavLink>
                                </NavItem>
                            </Nav>
                            <Badge badgeContent={4} primary={true}>
                                <NotificationsIcon />
                            </Badge>
                        </Navbar>

                    </div>
                    <Route exact path="/" render={() => (
                        <Camera />
                    )} />

                    <Route exact path="/Collection" render={() => (
                        <Collection />
                    )} />

                    <Route exact path="/SigeUp" render={() => (
                        <SigeUp />
                    )} />

                    <Route exact path="/Login" render={() => (
                        <Login />
                    )} />

                    <div className="footer">
                        <p>Welcome to my website</p>
                    </div>

                </div>
            </Router >
        );
    }

}

export default connect(state => ({

}))(Main);


