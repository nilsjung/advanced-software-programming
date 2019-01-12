import React from 'react';

/**
 * Renders the **InfoField Componnent**
 *
 * This is the Popup with the current stored information messages recieved from the server.
 * It also represents the success status by the bootstrap colors
 * * Failed: red (bootstrap Variable $danger),
 * * Neutral: blue (bootstrap variable $info),
 * * success: green (bootstrap variable $success).
 */
class InfoField extends React.Component {
    render() {
        let { message, isSuccess } = this.props;
        let alertClass = 'alert';
        let alertHeader = '';

        if (message) {
            message = message.toString();
            if (isSuccess === true) {
                alertClass += ' alert-success';
                alertHeader = 'Success';
            } else if (isSuccess === false) {
                alertClass += ' alert-danger';
                alertHeader = 'Error';
            } else {
                alertClass += ' alert-info';
                alertHeader = 'Information';
            }
        }

        return (
            <div className={alertClass} role="alert">
                <h5 className="alert-heading">{alertHeader}</h5>
                <p>{message}</p>
            </div>
        );
    }
}

export default InfoField;
