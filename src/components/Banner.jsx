import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Banner.css';

class Banner extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className='banner'>
                <span className='avatar'><img src="images/avatar.jpg" alt="" /></span>
                <h1>This is a website about <strong>Photography</strong></h1>
                <ul className="icons">
                    <li><a href="#" className="icon style2 fa-twitter"><span className="label">Twitter</span></a></li>
                    <li><a href="#" className="icon style2 fa-facebook"><span className="label">Facebook</span></a></li>
                    <li><a href="#" className="icon style2 fa-instagram"><span className="label">Instagram</span></a></li>
                    <li><a href="#" className="icon style2 fa-500px"><span className="label">500px</span></a></li>
                    <li><a href="#" className="icon style2 fa-envelope-o"><span className="label">Email</span></a></li>
                </ul>
            </div>
        );
    }
}

export default connect(state => ({

}))(Banner);
