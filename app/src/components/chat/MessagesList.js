import React, { Component } from 'react';

class MessagesList extends Component {
    render() {
        let { messages, user } = this.props;
        return (
            <div className="container">
                <ul className="messages">
                    {messages.map((message, index) => {
                        let additionalClass =
                            message.user.email !== user.email
                                ? 'is-response'
                                : '';
                        return (
                            <li
                                key={`message-${index}`}
                                className={`MessageItem ${additionalClass}`}
                            >
                                <small className="MessageHeader row">
                                    <span className="TimeStamp col-4">
                                        {message.timestamp.toLocaleString()}
                                    </span>
                                    <span className="MessageAuthor col-8">
                                        {message.user.name}
                                    </span>
                                </small>
                                <div className="MessageBody">
                                    {message.text}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default MessagesList;
