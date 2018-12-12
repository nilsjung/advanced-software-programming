import React from 'react';
import { Link } from 'react-router-dom';

import NavbarToggler from './NavbarToggler';

export default class NavBar extends React.Component {
    renderLinkIfAuthenticated = (isAuthenticated, link, label) => {
        if (isAuthenticated) {
            return (
                <Link className="nav-item nav-link" to={link}>
                    {label}
                </Link>
            );
        }
        return '';
    };

    renderLoginLogout = (isAuthenticated) => {
        if (isAuthenticated) {
            return (
                <Link
                    className="nav-item nav-link"
                    onClick={this.props.logout}
                    to="/"
                >
                    Logout
                </Link>
            );
        }

        return (
            <Link className="nav-item nav-link" to="login">
                Login
            </Link>
        );
    };

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/chat">
                    ChatApp
                </Link>
                <NavbarToggler />
                <div
                    className="collapse navbar-collapse"
                    id="navbarNavAltMarkup"
                >
                    <div className="navbar-nav">
                        {this.renderLinkIfAuthenticated(
                            this.props.isAuthenticated,
                            '/chat',
                            'Chat'
                        )}
                        {this.renderLoginLogout(this.props.isAuthenticated)}
                        {this.renderLinkIfAuthenticated(
                            !this.props.isAuthenticated,
                            '/register',
                            'Register'
                        )}
                    </div>
                </div>
            </nav>
        );
    }
}
