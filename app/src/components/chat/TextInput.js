import React, { Component } from 'react';

class TextInput extends Component {
    handleChange = (event) => {
        this.props.onChange(event.target.value);
    };

    handleKeyPress = (event) => {
        const message = this.props.value.trim();
        const { firstname, lastname, email } = this.props.user;

        if (event.which === 13) {
            if (message) {
                const user = {
                    name: firstname + ' ' + lastname,
                    email: email,
                };
                this.props.onSubmit({
                    user: user,
                    text: message,
                    timestamp: new Date(),
                });
            }

            event.preventDefault();
        }
    };

    handleClick = (event) => {
        const message = this.props.value.trim();
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

        event.preventDefault();
    };

    render() {
        return (
            <div className="container">
                <div className="input-group mb-3">
                    <input
                        id="messageInput"
                        className="form-control"
                        type="text"
                        value={this.props.value}
                        onKeyPress={this.handleKeyPress}
                        onChange={this.handleChange}
                        placeholder="Enter text..."
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={this.handleClick}
                        >
                            <i className="fa fa-paper-plane" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default TextInput;
