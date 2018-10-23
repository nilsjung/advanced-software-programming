import React, {Component} from 'react';

class TextInput extends Component {
    constructor(props) {
        super(props);

        this.handleChange = (event) => {
            this.props.onChange(event.target.value);
        }

        this.handleKeyPress = (event) => {
            if (event.which === 13) {
                const message = this.props.value.trim();
                if (message) {
                    this.props.onSubmit({
                        user: this.props.user,
                        text: message,
                        timestamp: new Date(),
                    });
                }

                event.preventDefault();
            }
        }

        this.handleClick = (event) => {
            const message = document.getElementById('messageInput').value.trim();

            if (message) {
                this.props.onSubmit({
                    user: this.props.user,
                    text: message,
                    timestamp: new Date(),
                });
            }

            event.preventDefault();
        }
    }

    render() {
        return (
            <div className='InputContainer'>
                <input id='messageInput'
                    type='text'
                    value={this.props.value}
                    className='MessageInput'
                    onKeyPress={this.handleKeyPress.bind(this)}
                    onChange={this.handleChange}
                    placeholder='enter text...'>
                </input>
                <button className='btn btn-primary' type='submit' onClick={this.handleClick}>Send!</button>
            </div>
        )
    }
}

export default TextInput