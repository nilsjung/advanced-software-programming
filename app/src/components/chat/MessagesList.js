import React, { Component } from 'react';

class MessagesList extends Component {
    render() {
        let { messages, user } = this.props;
        return (
            <div className="container">
                <ul className="messages">
                    {messages.map((message, index) => {
                        if (!message.user) {
                            return (
                                <Message
                                    className={'MessageItem ' + additionalClass}
                                    key={`message-${index}`}
                                    timestamp={message.timestamp.toLocaleString()}
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
                                timestamp={message.timestamp.toLocaleString()}
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

const Message = (props) => {
    return (
        <li className={props.className}>
            <small className="MessageHeader row">
                <span className="TimeStamp col-4">{props.timestamp}</span>
                <span className="MessageAuthor col-8">{props.userName}</span>
            </small>
            <div className="MessageBody">{props.text}</div>
        </li>
    );
};

export default MessagesList;
