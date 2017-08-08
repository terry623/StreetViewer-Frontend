import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './PhotoDisplay.css';
import Photo from 'components/Photo.jsx';

class PhotoDisplay extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='photo-display'>
                <Photo />
            </div>
        );
    }
}

export default connect(state => ({

}))(PhotoDisplay);
