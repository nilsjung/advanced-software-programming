import React from 'react'

import MessagesList from './MessagesList';
import TextInput from './TextInput';
import Chatrooms from './Chatrooms';


export default class Chat extends React.Component {
    render() {
        let { messages, currentMessage, updateMessage, addMessage, user, changeChatroom, createChatroom, chatrooms, currentChatroom} = this.props;

        return (
            <div className='ChatApp'>
                <div className='container'>
                    <div className='row'>
                        <div className='col'>
                            <Chatrooms chatrooms = {chatrooms} createChatroom = {createChatroom} changeChatroom={changeChatroom} />
                            <MessagesList user={user} messages={messages} currentChatroom = {currentChatroom} chatrooms = {chatrooms}/>
                            <TextInput
                                user={user}
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