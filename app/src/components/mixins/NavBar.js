import React from 'react';
import { Link } from 'react-router-dom';

import NavbarToggler from './NavbarToggler';
import { disconnect } from '../../socket/socket';

/**
 * This renders the bootstrap navigation.
 */
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

    handleLogout = () => {
        disconnect(this.props);
        this.props.logout();
    };

    renderLoginLogout = (isAuthenticated) => {
        if (isAuthenticated) {
            return (
                <Link
                    className="nav-item nav-link"
                    onClick={this.handleLogout}
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
                <Link className="navbar-brand" to="/">
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
                        {this.renderLinkIfAuthenticated(
                            this.props.isAuthenticated,
                            '/settings',
                            'Settings'
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
