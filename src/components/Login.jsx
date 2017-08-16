import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';

import './Login.css';

class Login extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='login'>
                <TextField
                    hintText="Hint Text"
                /><br />
                <br />
                <TextField
                    hintText="The hint text can be as long as you want, it will wrap."
                /><br />
                <TextField
                    id="text-field-default"
                    defaultValue="Default Value"
                /><br />
                <TextField
                    hintText="Hint Text"
                    floatingLabelText="Floating Label Text"
                /><br />
                <TextField
                    defaultValue="Default Value"
                    floatingLabelText="Floating Label Text"
                /><br />
                <TextField
                    hintText="Hint Text"
                    floatingLabelText="Fixed Floating Label Text"
                    floatingLabelFixed={true}
                /><br />
                <TextField
                    hintText="Password Field"
                    floatingLabelText="Password"
                    type="password"
                /><br />
                <TextField
                    hintText="MultiLine with rows: 2 and rowsMax: 4"
                    multiLine={true}
                    rows={2}
                    rowsMax={4}
                /><br />
                <TextField
                    hintText="Message Field"
                    floatingLabelText="MultiLine and FloatingLabel"
                    multiLine={true}
                    rows={2}
                /><br />
            </div>
        );
    }
}

export default connect(state => ({

}))(Login);
