import React from 'react';
import EmojiPicker from './EmojiPicker';

class InputWithButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };
    }

    updateMessage(message) {
        this.setState({
            value: this.state.value + message,
        });
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value });
    };

    handleKeyPress = (event) => {
        if (event.which === 13) {
            this.handleClick(event);
        }
    };

    handleClick = (event) => {
        const value = this.state.value.trim();

        this.setState({ value: '' }, () => {
            if (value) {
                this.props.onSubmit(value);
            }
        });

        event.preventDefault();
    };

    render() {
        const icon = this.props.icon || 'fa fa-paper-plane';

        return (
            <div className="input-group mb-3">
                {this.props.showSmileyPicker ? (
                    <div className="input-group-prepend">
                        <EmojiPicker onSelect={this.props.onSelect} />
                    </div>
                ) : (
                    ''
                )}
                <input
                    className="form-control"
                    type="text"
                    value={this.state.value}
                    onKeyPress={this.handleKeyPress}
                    onChange={this.handleChange}
                    placeholder="Enter text..."
                />
                <div className="input-group-append">
                    <button
                        className="btn btn-outline-primary"
                        type="button"
                        onClick={this.handleClick}
                    >
                        <i className={icon} />
                    </button>
                </div>
            </div>
        );
    }
}

export default InputWithButton;
