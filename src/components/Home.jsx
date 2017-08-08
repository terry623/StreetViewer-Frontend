import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Home.css';

class Home extends React.Component {
	static propTypes = {
		dispatch: PropTypes.func
	};

	constructor(props) {
		super(props);
	}

	render() {

		return (
			<div className='Home'>

			</div>

		);
	}
}

export default connect(state => ({

}))(Home);