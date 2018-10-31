import React from 'react'

import MessagesList from './MessagesList';
import TextInput from './TextInput';


export default class Chat extends React.Component {
    render() {
        let { messages, currentMessage, updateMessage, addMessage, userId } = this.props;

        return (
            <div className='ChatApp'>
                <div className='container'>
                    <div className='row'>
                        <div className='col'>
                            <MessagesList userId={userId} messages={messages} />
                            <TextInput
                                userId={userId}
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