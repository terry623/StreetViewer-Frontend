import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Collection.css';
import Banner from 'components/Banner.jsx';
import PhotoDisplay from 'components/PhotoDisplay.jsx';

class Collection extends React.Component {
	static propTypes = {
		dispatch: PropTypes.func
	};

	constructor(props) {
		super(props);
	}

	render() {

		return (
			<div className='collection'>

				<div className='banner'>
					<Banner />
				</div>

				<div className='photo-display'>
					<PhotoDisplay />
				</div>

				<div className='footer'>
					<p>Welcome to my website</p>
				</div>

			</div>

		);
	}
}

export default connect(state => ({

}))(Collection);
