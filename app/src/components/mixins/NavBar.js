import React from 'react';
import { Link } from 'react-router-dom';

export default class NavBar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">
                    ChatApp
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarNavAltMarkup"
                >
                    <div className="navbar-nav">
                        {this.props.isAuthenticated ? (
                            <Link className="nav-item nav-link" to="/chat">
                                Chat
                            </Link>
                        ) : (
                            ''
                        )}
                        <Link className="nav-item nav-link" to="/login">
                            {this.props.isAuthenticated ? 'Logout' : 'Login'}
                        </Link>
                        {!this.props.isAuthenticated ? (
                            <Link
                                className="nav-item nav-link disabled"
                                to="/register"
                            >
                                Register
                            </Link>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </nav>
        );
    }
}
