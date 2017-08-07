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
            <div>
                <span class="avatar"><img src="images/avatar.jpg" alt="" /></span>
                <h1>This is a website about <strong>Photography</strong></h1>
                <ul class="icons">
                    <li><a href="#" class="icon style2 fa-twitter"><span class="label">Twitter</span></a></li>
                    <li><a href="#" class="icon style2 fa-facebook"><span class="label">Facebook</span></a></li>
                    <li><a href="#" class="icon style2 fa-instagram"><span class="label">Instagram</span></a></li>
                    <li><a href="#" class="icon style2 fa-500px"><span class="label">500px</span></a></li>
                    <li><a href="#" class="icon style2 fa-envelope-o"><span class="label">Email</span></a></li>
                </ul>
            </div>
        );
    }
}

export default connect(state => ({

}))(Banner);
