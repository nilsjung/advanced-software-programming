import React, {Component} from 'react';

class TextInput extends Component {
    handleChange = (event) => {
        this.props.onChange(event.target.value);
    }

    handleKeyPress = (event) => {
        if (event.which === 13) {
            const message = this.props.value.trim();
            if (message) {
                const user = {name: this.props.user.firstname + " " + this.props.user.lastname, email: this.props.user.email};
                this.props.onSubmit({
                    user: user,
                    text: message,
                    timestamp: new Date(),
                });
            }

            event.preventDefault();
        }
    }

    handleClick = (event) => {
        const message = this.props.value.trim();

        if (message) {
            const user = {name: this.props.user.firstname + " " + this.props.user.lastname, email: this.props.user.email};
            this.props.onClick({
                user: user,
                text: message,
                timestamp: new Date(),
            });
        }

        event.preventDefault();
    }

    render() {
        return (
            <div className='container'>
                <div className='input-group mb-3'>
                    <input
                        id='messageInput'
                        className='form-control'
                        type='text'
                        value={this.props.value}
                        onKeyPress={this.handleKeyPress}
                        onChange={this.handleChange}
                        placeholder='Enter text...'>
                    </input>
                    <div className='input-group-append'>
                        <button className='btn btn-primary'
                            type='button'
                            onClick={this.handleClick}><i className='fa fa-paper-plane'></i></button>
                    </div>
                </div>
            </div>
        )
    }
}

export default TextInput