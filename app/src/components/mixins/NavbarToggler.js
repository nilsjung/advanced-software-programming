import React from 'react';

/**
 * Dump bootstrap navbar toggler used for responsive behaviour
 */
const NavbarToggler = () => {
    return (
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
    );
};
export default NavbarToggler;
