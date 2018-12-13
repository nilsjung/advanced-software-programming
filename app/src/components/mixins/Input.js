import React from 'react';

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
    }

    handleChange = (event) => {
        const newValue = event.target.value;

        this.setState({ value: newValue }, () => {
            this.props.onChange(this.state.value);
        });
    };

    render() {
        let { placeholder, Id, label, type } = this.props;
        const inputId = Id || Symbol('input');
        let renderLabel = '';

        if (label) {
            renderLabel = <label htmlFor={inputId}>{label}</label>;
        }

        if (!type) {
            type = 'text';
        }

        return (
            <div className="form-group">
                {renderLabel}
                <input
                    onChange={this.handleChange}
                    type={type}
                    value={this.state.value}
                    className="form-control"
                    placeholder={placeholder}
                    id={inputId}
                />
            </div>
        );
    }
}

export default Input;
