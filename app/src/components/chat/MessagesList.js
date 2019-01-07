import React, { Component } from 'react';

import Message from './Message';
class MessagesList extends Component {
    render() {
        let { messages, user } = this.props;
        return (
            <div className="container message-container">
                <ul className="messages">
                    {messages.map((message, index) => {
                        if (!message.user) {
                            return (
                                <Message
                                    className={'MessageItem ' + additionalClass}
                                    key={`message-${index}`}
                                    timestamp={message.timestamp}
                                    userName="Guest"
                                    text={message.text}
                                />
                            );
                        }

                        let additionalClass =
                            message.user.email !== user.email
                                ? 'is-response'
                                : '';
                        return (
                            <Message
                                className={'MessageItem ' + additionalClass}
                                key={`message-${index}`}
                                timestamp={message.timestamp}
                                userName={message.user.name}
                                text={message.text}
                            />
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default MessagesList;
