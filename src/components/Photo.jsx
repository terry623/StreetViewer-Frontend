import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { list_photos } from 'states/photos-actions.js';

import './Photo.css';

class Photo extends React.Component {
    static propTypes = {
        account:PropTypes.string,
        photos: PropTypes.array,
        account: PropTypes.string,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(list_photos(this.props.account));
    }

    render() {
        const { photos } = this.props;

        let children = (
            <div>No photo here.</div>
        );
        if (photos.length) {
            children = photos.map(result => (
                <img src={result.photo_url} />
            ));
        }

        return (
            <div className='photo'>
                {children}
            </div>
        );
    }
}

export default connect(state => ({
    ...state.photos,
    ...state.account
}))(Photo);
