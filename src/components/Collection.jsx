import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Collection.css';
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
				<PhotoDisplay />
			</div>

		);
	}
}

export default connect(state => ({

}))(Collection);
