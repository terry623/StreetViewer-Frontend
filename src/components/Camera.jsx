import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StreetView from 'components/StreetView.jsx';
import Chat from 'components/Chat.jsx';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

import './Camera.css';

class Camera extends React.Component {
	static propTypes = {
		dispatch: PropTypes.func
	};

	constructor(props) {
		super(props);
	}

	render() {

		return (
			<div className='Camera'>
				<Grid
					container
					align='center'
					direction='row'
					justify='center'
				>
					<Grid item>
						<Paper elevation={24}>
							<StreetView />
						</Paper>
					</Grid>

					<Grid item>
						<Chat className='Chat'/>
					</Grid>

				</Grid>

			</div>

		);
	}
}

export default connect(state => ({

}))(Camera);