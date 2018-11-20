import React, {Component} from 'react';

class MessagesList extends Component {

    getChatHistory = () => {
        const currentChatroom = this.props.currentChatroom;
        const messages = this.props.chatrooms.map((room) => {
            if(room.name === currentChatroom) {
                return room.chats;
            }
        });
        return messages;
    }

    render() {
        let {messages, user, currentChatroom, chatrooms} = this.props;
        return (
            <div className='container'>
                <ul className='messages'>
                    {messages.map((message, index) => {
                        let additionalClass = message.user.userId !== user.userId ? 'is-response' : ''
                        return (
                            <li key={`message-${index}`} className={`MessageItem ${additionalClass}`}>
                                <small className='MessageHeader row'>
                                    <span className='TimeStamp col-4'>{message.timestamp.toLocaleString()}</span>
                                    <span className='MessageAuthor col-8'>{message.user.userId}</span>
                                </small>
                                <div className='MessageBody'>
                                    {message.text}
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}

export default MessagesList;