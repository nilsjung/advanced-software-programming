import React from 'react'

import MessagesList from './MessagesList';
import TextInput from './TextInput';


export default class Chat extends React.Component {
    render() {
        let { messages, currentMessage, updateMessage, addMessage, user } = this.props;

        return (
            <div className='ChatApp'>
                <div className='container'>
                    <div className='row'>
                        <div className='col'>
                            <MessagesList user={user} messages={messages} />
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