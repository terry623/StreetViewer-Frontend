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
import Home from 'components/Home.jsx';

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
                <div id="wrapper">
                    <div className='main'>
                        <div className='bg-faded'>
                            <div className='container'>
                                <Navbar color='faded' light toggleable>
                                    <NavbarBrand className='text-info' href="/">Photo Exhibition</NavbarBrand>
                                    <Nav navbar>
                                        <NavItem>
                                            <NavLink tag={Link} to='/Home'>Home</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} to='/Collection'>Collection</NavLink>
                                        </NavItem>
                                    </Nav>
                                </Navbar>
                            </div>
                        </div>

                        <Route exact path="/Home" render={() => (
                            <Home />
                        )} />

                        <Route exact path="/Collection" render={() => (
                            <Collection />
                        )} />

                        <footer id="footer">
                            <p>Welcome to my website</p>
                        </footer>
                    </div>
                </div>
            </Router>
        );
    }

}

export default connect(state => ({

}))(Main);
