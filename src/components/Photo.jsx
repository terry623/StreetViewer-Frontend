import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { list_photos } from 'states/photos-actions.js';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import './Photo.css';

class Photo extends React.Component {
    static propTypes = {
        account: PropTypes.string,
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
                <Grid item lg={4} md={6} sm={12} key={result.id}>
                    <Card raised className='each_card'>
                        <CardMedia
                            className='each_card_media'
                            image={result.photo_url}
                        />
                    </Card>
                </Grid >
            ));
        }

        return (
            
            <div className='photo'>
                <Grid container spacing={24}>
                    {children}
                </Grid>

            </div>

        );
    }
}

export default connect(state => ({
    ...state.photos,
    ...state.account
}))(Photo);
