import React, { Component } from 'react';

import {BrowserRouter as Router, Route} from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as messageActionCreators from './actions/messageActions';
import * as userActionCreators from './actions/userActions';


import Chat from './components/chat/';
import NavBar from './components/mixins/NavBar';
import Login from './components/login'
import Register from './components/Register';

class App extends Component {

    renderChat = () => {
        let {userId, messages, currentMessage, addMessage, updateMessage} = this.props;
        return <Chat
            messages={messages}
            userId={userId}
            currentMessage={currentMessage}
            addMessage={addMessage}
            updateMessage={updateMessage}
        ></Chat>
    }

    render() {
        const {isAuthenticated} = this.props

        return (
            <Router>
                <main>
                    <NavBar isAuthenticated={isAuthenticated}/>

                    <Route path='/chat' exact render={this.renderChat} />
                    <Route path='/login' render={() => <Login login={this.props.login}></Login>} ></Route>
                    <Route path='/register' render={() => <Register></Register>} ></Route>
                </main>
            </Router>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        messages: state.messages,
        currentMessage: state.currentMessage
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addMessage: messageActionCreators.addMessage,
        updateMessage: messageActionCreators.updateMessage,
        login: userActionCreators.login,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
