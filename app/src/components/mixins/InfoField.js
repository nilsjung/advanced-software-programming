import React from 'react';

class InfoField extends React.Component {
    render() {
        let { message, isSuccess } = this.props;
        let alertClass = 'alert';
        let alertHeader = '';

        if (message) {
            message = message.toString();
            if (isSuccess) {
                alertClass += ' alert-success';
                alertHeader = 'Success';
            } else {
                alertClass += ' alert-danger';
                alertHeader = 'Error';
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
