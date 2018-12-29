import React, { Component } from 'react';
import InputWithButton from '../mixins/InputWithButton';
import EmojiPicker from '../mixins/EmojiPicker';

class TextInput extends Component {
    onChange = (value) => {
        this.props.onChange(value);
    };

    onSubmit = (message) => {
        const { firstname, lastname, email } = this.props.user;

        if (message) {
            const user = {
                name: firstname + ' ' + lastname,
                email: email,
            };
            this.props.onClick({
                user: user,
                text: message,
                timestamp: new Date(),
            });
        }
    };

    render() {
        return (
            <div className="container">
                <InputWithButton
                    onSubmit={this.onSubmit}
                    onChange={this.onChange}
                />
                <EmojiPicker>onChange={this.onChange}</EmojiPicker>
            </div>
        );
    }
}

export default TextInput;
