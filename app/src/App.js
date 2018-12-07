import React, { Component } from 'react';

import { Route, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as messageActionCreators from './actions/messageActions';
import * as userActionCreators from './actions/userActions';
import * as chatroomActionCreators from './actions/chatroomActions';

import Chat from './components/chat/';
import NavBar from './components/mixins/NavBar';
import Login from './components/login';
import Registration from './components/registration';
import InfoField from './components/mixins/InfoField';

class App extends Component {
    renderChat = () => {
        const {
            user,
            messages,
            currentMessage,
            addMessage,
            updateMessage,
            changeChatroom,
            createChatroom,
            chatrooms,
            currentChatroom,
            getChatroom,
        } = this.props;
        return (
            <Chat
                messages={messages}
                user={user}
                currentMessage={currentMessage}
                addMessage={addMessage}
                updateMessage={updateMessage}
                changeChatroom={changeChatroom}
                createChatroom={createChatroom}
                chatrooms={chatrooms}
                currentChatroom={currentChatroom}
                getChatroom={getChatroom}
            />
        );
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <NavBar isAuthenticated={this.props.isAuthenticated} />
                    </div>
                    <div className="col-12">
                        <Route path="/chat" exact render={this.renderChat} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Registration} />
                    </div>
                    <div className="col-12">
                        <InfoField
                            message={this.props.infoMessage}
                            isSuccess={this.props.isSuccess}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        messages: state.messages,
        currentMessage: state.currentMessage,
        chatrooms: state.chatrooms,
        currentChatroom: state.currentChatroom,
        infoMessage: state.infoMessage,
        isSuccess: state.isSuccess,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            addMessage: messageActionCreators.addMessage,
            updateMessage: messageActionCreators.updateMessage,
            login: userActionCreators.login,
            changeChatroom: chatroomActionCreators.changeChatroom,
            createChatroom: chatroomActionCreators.createChatroom,
            getChatroom: chatroomActionCreators.getChatroom,
        },
        dispatch
    );
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(App)
);
