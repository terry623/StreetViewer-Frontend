import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Photo.css';

class Photo extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='photo'>
                <div>
                    <a href="images/fulls/01.jpg">
                        <img src="images/thumbs/01.jpg"/>
                        <h3>Lorem ipsum dolor sit amet</h3>
                    </a>
                    <a href="images/fulls/02.jpg">
                        <img src="images/thumbs/02.jpg"/>
                        <h3>Lorem ipsum dolor sit amet</h3>
                    </a>
                </div>
                <div>
                    <a href="images/fulls/03.jpg">
                        <img src="images/thumbs/03.jpg"/>
                        <h3>Lorem ipsum dolor sit amet</h3>
                    </a>
                    <a href="images/fulls/04.jpg">
                        <img src="images/thumbs/04.jpg"/>
                        <h3>Lorem ipsum dolor sit amet</h3>
                    </a>
                    <a href="images/fulls/05.jpg">
                        <img src="images/thumbs/05.jpg"/>
                        <h3>Lorem ipsum dolor sit amet</h3>
                    </a>
                </div>
                <div>
                    <a href="images/fulls/06.jpg">
                        <img src="images/thumbs/06.jpg"/>
                        <h3>Lorem ipsum dolor sit amet</h3>
                    </a>
                    <a href="images/fulls/07.jpg">
                        <img src="images/thumbs/07.jpg"/>
                        <h3>Lorem ipsum dolor sit amet</h3>
                    </a>
                </div>
            </div>
        );
    }
}

export default connect(state => ({

}))(Photo);
