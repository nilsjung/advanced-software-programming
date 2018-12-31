import React, { Component } from 'react';
import EmojiPicker from '../mixins/EmojiPicker';
import InputWithButton from '../mixins/InputWithButton';

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

    onSelect = (emoji) => {
        this.refs.input.updateMessage(emoji);
    };

    render() {
        return (
            <div className="container">
                <InputWithButton
                    ref="input"
                    onSubmit={this.onSubmit}
                    onChange={this.onChange}
                    updateMessage={this.onChange}
                />
                <EmojiPicker onSelect={this.onSelect} />
            </div>
        );
    }
}

export default TextInput;
