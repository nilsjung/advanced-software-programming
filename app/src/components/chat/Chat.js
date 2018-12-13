import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as chatroomActionCreators from '../../actions/chatroomActions';

import MessagesList from './MessagesList';
import TextInput from './TextInput';
import Chatrooms from './Chatrooms';

class Chat extends React.Component {
    renderInputAndMessages = () => {
        let {
            messages,
            currentMessage,
            updateMessage,
            addMessage,
            user,
            chatrooms,
            currentChatroom,
        } = this.props;

        if (currentChatroom !== '') {
            return (
                <div className="col">
                    <MessagesList
                        user={user}
                        messages={messages}
                        currentChatroom={currentChatroom}
                        chatrooms={chatrooms}
                    />
                    <TextInput
                        user={user}
                        value={currentMessage}
                        onChange={updateMessage}
                        onSubmit={addMessage}
                        onClick={addMessage}
                    />
                </div>
            );
        } else if (chatrooms.length === 0) {
            return (
                <div className="col-12">
                    <p> Create a Chatroom first </p>
                </div>
            );
        }
    };

    render() {
        const {
            changeChatroom,
            createChatroom,
            chatrooms,
            getChatroom,
            deleteChatroom,
            accessToken,
        } = this.props;

        return (
            <div className="ChatApp">
                <div className="container">
                    <div className="row">
                        <Chatrooms
                            accessToken={accessToken}
                            chatrooms={chatrooms}
                            createChatroom={createChatroom}
                            changeChatroom={changeChatroom}
                            getChatroom={getChatroom}
                            deleteChatroom={deleteChatroom}
                        />
                    </div>
                    <div className="row">
                        <div className="h6">
                            Your Chatroom: {this.props.currentChatroom}
                        </div>
                    </div>
                    <div className="row">{this.renderInputAndMessages()}</div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        chatrooms: state.chatrooms,
        currentChatroom: state.currentChatroom,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            changeChatroom: chatroomActionCreators.changeChatroom,
            createChatroom: chatroomActionCreators.createChatroom,
            getChatroom: chatroomActionCreators.getChatroom,
            deleteChatroom: chatroomActionCreators.deleteChatroom,
        },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat);
