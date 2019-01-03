import React from 'react';

import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import * as registerActions from '../../actions/registerActions';
import RegistrationForm from '../registration/RegistrationForm';

class Registration extends React.Component {
    render() {
        if (this.props.isSuccess) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="container">
                <div className="h2">Register</div>
                <RegistrationForm onSubmit={this.props.registerUser} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isSuccess: state.isSuccess,
        user: state.user,
        isLoading: state.isLoading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        registerUser: (user) => {
            dispatch(registerActions.registerUser(user));
        },
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Registration)
);
