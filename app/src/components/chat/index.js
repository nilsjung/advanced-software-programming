import React from 'react'

import MessagesList from './MessagesList';
import TextInput from './TextInput';
import Chatrooms from './Chatrooms';


export default class Chat extends React.Component {

    renderInputAndMessages = () => {
        let { messages, currentMessage, updateMessage, addMessage, user, changeChatroom, createChatroom, chatrooms,
            currentChatroom, getChatroom} = this.props;
        if(currentChatroom !== '') {
            return (
                <div className='col'>
                <MessagesList user={user} messages={messages} currentChatroom = {currentChatroom} chatrooms = {chatrooms}/>
            <TextInput
            user={user}
            value={currentMessage}
            onChange={updateMessage}
            onSubmit={addMessage}
            onClick={addMessage}
            />
            </div>
        )
        }
        else if (chatrooms.length === 0){
            return (
                <div className='col'>
                        <p> Create a Chatroom first </p>
                </div>
            )
        }
        else {
            return (
                <div className='col'>
                <p> Select a Chatroom </p>
            </div>
        )
        }
    };
    render() {
        let { messages, currentMessage, updateMessage, addMessage, user, changeChatroom, createChatroom, chatrooms,
            currentChatroom, getChatroom} = this.props;
        return (
            <div className='ChatApp'>
                <div className='container'>
                    <div className='row'>
                            <Chatrooms chatrooms = {chatrooms} createChatroom = {createChatroom}
                            changeChatroom={changeChatroom} getChatroom = {getChatroom}/>
                             {this.renderInputAndMessages()}
                    </div>
                </div>
            </div>
        );
    }
}