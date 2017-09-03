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
        // const { photos } = this.props;

        // let children = (
        //     <div>No photo here.</div>
        // );
        // if (photos.length) {
        //     children = photos.map(result => (
        //         <img key={result.id} src={result.photo_url} />
        //     ));
        // }

        return (
            // <div className='photo'>
            //     {/* {children} */}
            //  </div>
            <div>
                <Grid container spacing={16}>
                    <Grid item lg={4} md={6} sm={12}>
                        <Card raised className='each_card'>
                            <CardMedia
                                className='each_card_media'
                                image="https://maps.googleapis.com/maps/api/streetview?size=300x200&location=46.414382,10.013988&heading=151.78&pitch=-0.76&key=AIzaSyB2qGLOwrR1n-FrGskEn47AU1X6Nban0S4"
                            />
                            <CardContent className='each_card_content'>
                                Lizards are a widespread group of squamate reptiles.
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item lg={4} md={6} sm={12}>
                        <Card raised className='each_card'>
                            <CardMedia
                                className='each_card_media'
                                image="https://maps.googleapis.com/maps/api/streetview?size=300x200&location=46.414382,10.013988&heading=151.78&pitch=-0.76&key=AIzaSyB2qGLOwrR1n-FrGskEn47AU1X6Nban0S4"
                            />
                            <CardContent className='each_card_content'>
                                Lizards are a widespread group of squamate reptiles.
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item lg={4} md={6} sm={12}>
                        <Card raised className='each_card'>
                            <CardMedia
                                className='each_card_media'
                                image="https://maps.googleapis.com/maps/api/streetview?size=300x200&location=46.414382,10.013988&heading=151.78&pitch=-0.76&key=AIzaSyB2qGLOwrR1n-FrGskEn47AU1X6Nban0S4"
                            />
                            <CardContent className='each_card_content'>
                                Lizards are a widespread group of squamate reptiles.
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item lg={4} md={6} sm={12}>
                        <Card raised className='each_card'>
                            <CardMedia
                                className='each_card_media'
                                image="https://maps.googleapis.com/maps/api/streetview?size=300x200&location=46.414382,10.013988&heading=151.78&pitch=-0.76&key=AIzaSyB2qGLOwrR1n-FrGskEn47AU1X6Nban0S4"
                            />
                            <CardContent className='each_card_content'>
                                Lizards are a widespread group of squamate reptiles.
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

            </div>

        );
    }
}

export default connect(state => ({
    ...state.photos,
    ...state.account
}))(Photo);
