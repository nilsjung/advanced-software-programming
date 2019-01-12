import React, { Component } from 'react';

import Message from './Message';

/**
 * Renders the **MessageList Component**
 *
 * This is the collection that represents all messages.
 * defines wether a message is a response message or written by the current user.

 */
class MessagesList extends Component {
    render() {
        let { messages, user } = this.props;
        return (
            <div className="container">
                <ul className="messages">
                    {messages.map((message, index) => {
                        // if no user is given, set 'Guest' as author.
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

                        // check if the message is recieved from another user
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
