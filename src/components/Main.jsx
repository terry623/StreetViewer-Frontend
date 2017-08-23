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
import LogIn from 'components/LogIn.jsx';

import { log_out } from 'states/account-actions.js';


import './Main.css';


class Main extends React.Component {
    static propTypes = {
        account: PropTypes.string,
        store: PropTypes.object,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
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
                                    <NavLink tag={Link} to='/'>{this.props.account}</NavLink>
                                </NavItem>
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
                                    <NavLink tag={Link} to='/LogIn'>LogIn</NavLink>
                                </NavItem>
                                <Button raised onClick={this.handleLogout}>
                                    Log Out!
                                </Button>
                            </Nav>
                        </Navbar>

                    </div>
                    <Route exact path="/" render={() => (
                        <Camera />
                    )} />

                    <Route exact path="/Collection" render={() => (
                        <Collection />
                    )} />

                    <Route exact path="/SigeUp" render={() => (
                        <SignUp />
                    )} />

                    <Route exact path="/LogIn" render={() => (
                        <LogIn />
                    )} />

                    <div className="footer">
                        <p>Welcome to my website</p>
                    </div>

                </div>
            </Router >
        );
    }


    handleLogout() {
        this.props.dispatch(log_out());
    }

}

export default connect(state => ({
    ...state.account
}))(Main);


