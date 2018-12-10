import React from 'react';

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
