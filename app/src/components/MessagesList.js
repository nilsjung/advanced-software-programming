import React, {Component} from 'react';

const CHAT_COLOR_ME = 'bg-light';
const CHAT_COLOR_OTHER = 'bg-dark text-light';

class MessagesList extends Component {
    render() {
        let {messages, userId} = this.props;
        return (
            <div className='container'>
                {messages.map((message, index) => {
                    let chatColor = message.userId !== userId ? CHAT_COLOR_OTHER : CHAT_COLOR_ME + ' align-self-end';

                    return (
                        <div key={`message-${index}`} className={`row`}>
                            <div className={`p-4 mb-2 col rounded ${chatColor}`}>
                                <small className='row'>
                                    <span className='col-1'>{message.userId}</span>
                                    <span className='col-8 TimeStamp text-muted'>{message.timestamp.toLocaleString()}</span>
                                </small>
                                <div className=''>
                                    {message.text}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default MessagesList;