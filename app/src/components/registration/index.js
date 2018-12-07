import React from 'react';

import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import * as actions from '../../actions/registerActions';

import RegistrationForm from '../registration/RegistrationForm';

class Registration extends React.Component {
    render() {
        if (this.props.isSuccess) {
            this.props.reset();
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
        registerUser: (user) => dispatch(actions.registerUser(user)),
        reset: () => {
            dispatch(actions.registrationIsSuccess(null));
        },
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Registration)
);
