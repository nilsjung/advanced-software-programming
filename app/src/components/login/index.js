import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// for redirect
import { Redirect } from 'react-router';

import * as userActionCreators from '../../actions/userActions';

import LoginForm from './LoginForm';

class Login extends React.Component {
    componentDidMount() {
        this.props.logout();
    }

    handleLogin = (user) => {
        this.props.login(user);
    };

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/chat" />;
        }
        return (
            <div className="container">
                <div className="h2">Login</div>
                <LoginForm login={this.handleLogin} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        infoMessage: state.infoMessage,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        login: (user) => dispatch(userActionCreators.login(user)),
        logout: () => dispatch(userActionCreators.logout()),
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Login)
);
