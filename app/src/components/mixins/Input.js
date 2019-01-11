import React from 'react';

/**
 * This represents a bootstrap input field with label boxed in a 'form-group'.
 */
class Input extends React.Component {
    handleChange = (event) => {
        const newValue = event.target.value;
        this.props.onChange(newValue);
    };

    render() {
        let { placeholder, Id, label, type } = this.props;
        const inputId = Id || Symbol('input');
        let renderLabel = '';

        if (label) {
            renderLabel = <label htmlFor={inputId.toString()}>{label}</label>;
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
                    defaultValue={this.props.defaultValue}
                    ref={(input) => {
                        return input;
                    }}
                    className="form-control"
                    placeholder={placeholder}
                    id={inputId.toString()}
                />
            </div>
        );
    }
}

export default Input;
