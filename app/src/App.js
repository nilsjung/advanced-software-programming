import React, { Component } from 'react';

import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as messageActionCreators from './actions/messageActions';
import * as userActionCreators from './actions/userActions';
import * as chatroomActionCreators from './actions/chatroomActions';


import Chat from './components/chat/';
import NavBar from './components/mixins/NavBar';
import Login from './components/login'
import Register from './components/Register';

class App extends Component {

    renderChat = () => {
        const {user, messages, currentMessage, addMessage, updateMessage, changeChatroom, createChatroom, chatrooms, currentChatroom} = this.props;
        return <Chat messages={messages}
            user={user}
            currentMessage={currentMessage}
            addMessage={addMessage}
            updateMessage={updateMessage}
            changeChatroom={changeChatroom}
            createChatroom = {createChatroom}
            chatrooms ={chatrooms}
            currentChatroom = {currentChatroom}
        ></Chat>
    }

    render() {
        return (
                <main>
                    <NavBar isAuthenticated={this.props.isAuthenticated}/>
                    <Route path='/chat' exact render={this.renderChat} />
                    <Route path='/login' component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
                </main>
        )
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
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addMessage: messageActionCreators.addMessage,
        updateMessage: messageActionCreators.updateMessage,
        login: userActionCreators.login,
        changeChatroom: chatroomActionCreators.changeChatroom,
        createChatroom: chatroomActionCreators.createChatroom,
    }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
