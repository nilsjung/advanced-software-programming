import React, { Component } from 'react';

import { Route, withRouter, Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as messageActionCreators from './actions/messageActions';
import * as userActionCreators from './actions/userActions';
import * as chatroomActionCreators from './actions/chatroomActions';

import Chat from './components/chat/Chat';
import NavBar from './components/mixins/NavBar';
import Login from './components/login/Login';
import Registration from './components/registration/Registration';
import InfoField from './components/mixins/InfoField';

class App extends Component {
    renderChat = () => {
        const {
            user,
            messages,
            isAuthenticated,
            currentMessage,
            addMessage,
            updateMessage,
            changeChatroom,
            createChatroom,
            chatrooms,
            currentChatroom,
            getChatroom,
        } = this.props;

        if (isAuthenticated) {
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
        }
        return (
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">Welcome to the Chat!</h1>
                    <p className="lead">
                        Find friends, create chatrooms and stay in contact with
                        your friends.
                    </p>
                    <hr className="my-4" />
                    <p>
                        To use our app, first{' '}
                        <Link to="/register">Register</Link> or{' '}
                        <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
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
                </div>
                <div className="container bottom-align">
                    <InfoField
                        message={this.props.infoMessage}
                        isSuccess={this.props.isSuccess}
                    />
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
