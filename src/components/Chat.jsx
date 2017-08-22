import React from 'react';
import PropTypes from 'prop-types';

class Chat extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.onMessage = this.onMessage.bind(this);
    }

    onMessage(message) {
        console.log(message);
    }

    render() {
        return (
            <div>
                <h1>My React SocketIO Demo.</h1>
                <Event event='eventName' handler={this.onMessage} />
            </div>
        );
    }

}

