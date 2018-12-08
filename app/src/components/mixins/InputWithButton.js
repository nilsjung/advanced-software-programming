import React from 'react';

class InputWithButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value });
    };

    handleKeyPress = (event) => {
        if (event.which === 13) {
            const value = this.state.value.trim();
            this.setState({ value: '' }, () => {
                if (value) {
                    this.props.onSubmit(value);
                }
            });
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
                        className="btn btn-primary"
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
