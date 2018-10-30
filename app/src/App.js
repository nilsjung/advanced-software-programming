import React, { Component } from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import * as messageActionCreators from  './actions/messageActions';

import MessagesList from './components/MessagesList';
import TextInput from './components/TextInput';

class App extends Component {
    render() {
        let {messages, currentMessage, updateMessage, addMessage, user} = this.props;

        return (
            <div className='ChatApp'>
                <div className='container'>
                    <div className='row'>
                        <div className='col'>
                        <MessagesList userId={userId} messages={messages} />
                        <TextInput
                            userId={userId}
                            value={currentMessage}
                            onChange={updateMessage}
                            onSubmit={addMessage}
                            onClick={addMessage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: {
            userId: state.userId,
        },
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
