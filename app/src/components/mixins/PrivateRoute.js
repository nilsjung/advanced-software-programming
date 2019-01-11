import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/**
 * This renders a **Private Route**
 *
 * A Private route can just be seen, if the current user is authenticated.
 * Otherwise the user will always be redirected to the login route.
 *
 * @param {Component} component the component that should be rendered by the route
 * @param {Boolean} authed if the user is authenticated or not
 * @param attributes more attributes to render
 * @returns the Private Route as jsx element
 */
export const PrivateRoute = ({
    component: Component,
    authed,
    ...attributes
}) => {
    return (
        <Route
            {...attributes}
            render={(props) =>
                authed === true ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                        }}
                    />
                )
            }
        />
    );
};
