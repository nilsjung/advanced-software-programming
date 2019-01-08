import React, { Component } from 'react';

import { Route, withRouter, Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as messageActionCreators from './actions/messageActions';
import * as userActionCreators from './actions/userActions';
import * as chatroomActionCreators from './actions/chatroomActions';
import * as userChatActionCreator from './actions/userChatActions';

import Chat from './components/chat/Chat';
import NavBar from './components/mixins/NavBar';
import Login from './components/login/Login';
import Registration from './components/registration/Registration';
import InfoField from './components/mixins/InfoField';
import Settings from './components/user/Settings';
import { PrivateRoute } from './components/mixins/PrivateRoute';
import UserInformationField from './components/user/UserInformationField';

class App extends Component {
    renderHome = () => {
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
            <div className="main">
                <NavBar
                    logout={this.props.logout}
                    isAuthenticated={this.props.isAuthenticated}
                />
                <div className="container mainContent">
                    <UserInformationField />

                    <Route path="/" exact render={this.renderHome} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Registration} />
                    <PrivateRoute
                        authed={this.props.isAuthenticated}
                        path="/chat"
                        component={Chat}
                    />
                    <PrivateRoute
                        authed={this.props.isAuthenticated}
                        path="/settings"
                        component={Settings}
                    />
                    <div className="row bottom-align">
                        <div className="col">
                            <InfoField
                                message={this.props.infoMessage}
                                isSuccess={this.props.isSuccess}
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
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        messages: state.messages,
        currentMessage: state.currentMessage,
        chatrooms: state.chatrooms,
        currentChatroom: state.currentChatroom,
        users: state.users,
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
            loadUsers: userActionCreators.getUsers,
            createUserChat: userChatActionCreator.createUserChat,
            logout: userActionCreators.logout,
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
