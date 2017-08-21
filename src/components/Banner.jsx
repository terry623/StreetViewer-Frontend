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

            </div>
        );
    }
}

export default connect(state => ({

}))(Banner);
