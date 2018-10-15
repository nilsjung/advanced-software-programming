import React, { Component } from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as messageActionCreators from  './actions/message-actions';

import './App.css';
import MessagesList from './components/MessagesList';
import TextInput from './components/TextInput';

class App extends Component {
    render() {
        let {messages, currentMessage, updateMessage, addMessage, userId} = this.props;

        return (
            <div className="ChatApp">
                <MessagesList userId={userId} messages={messages} />
                <TextInput
                    userId={userId}
                    value={currentMessage}
                    onChange={updateMessage}
                    onSubmit={addMessage}
                    onClick={addMessage}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        userId: state.userId,
        messages: state.messages,
        currentMessage: state.currentMessage
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addMessage: messageActionCreators.addMessage,
        updateMessage: messageActionCreators.updateMessage,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
