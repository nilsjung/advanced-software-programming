import React from 'react';

import MessagesList from './MessagesList';
import TextInput from './TextInput';
import Chatrooms from './Chatrooms';
import UserList from '../userList/list';

export default class Chat extends React.Component {
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
        } else {
            return (
                <div className="col-12">
                    <p> Select a Chatroom </p>
                </div>
            );
        }
    };
    render() {
        let {
            changeChatroom,
            createChatroom,
            chatrooms,
            getChatroom,
        } = this.props;

        return (
            <div className="ChatApp">
                <div className="container">
                    <div className="row">
                        <div className="col-sm">
                            <UserList />
                        </div>
                        <Chatrooms
                            chatrooms={chatrooms}
                            createChatroom={createChatroom}
                            changeChatroom={changeChatroom}
                            getChatroom={getChatroom}
                        />
                    </div>
                    <div className="row">{this.renderInputAndMessages()}</div>
                </div>
            </div>
        );
    }
}
