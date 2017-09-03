import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Collection.css';
import Photo from 'components/Photo.jsx';

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
				 <Photo />
			</div>

		);
	}
}

export default connect(state => ({

}))(Collection);
