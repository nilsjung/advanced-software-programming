import React, {Component} from 'react';


class MessagesList extends Component {
    render() {
        let {messages, user} = this.props;
        return (
            <ol className='MessageContainer'>
                {messages.map((message, index) => {
                    let additionalClass = message.user.userId !== user.userId ? 'is-response' : ''
                    return (
                        <li key={`message-${index}`} className={`MessageItem ${additionalClass}`}>
                            <div className='MessageHeader'>
                                <span className='TimeStamp'>{message.timestamp.toLocaleString()}</span>
                                <span className='MessageAuthor'>{message.user.userId}</span>
                            </div>
                            <div className='MessageBody'>
                                {message.text}
                            </div>
                        </li>
                    )
                })}
            </ol>
        );
    }
}

export default MessagesList;