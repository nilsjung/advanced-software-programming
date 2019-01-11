import React from 'react';

/**
 * Renders a bootstrap button with predefined color $primary
 */
const Button = (props) => {
    let buttonClassName = 'btn';
    let buttonColor = 'btn-primary';
    const type = props.type || 'submit';

    buttonClassName += ' ' + props.additionalClassName;

    return (
        <button
            type={type}
            className={buttonClassName + ' ' + buttonColor}
            onClick={props.onClick}
        >
            {props.label}
        </button>
    );
};

export default Button;
