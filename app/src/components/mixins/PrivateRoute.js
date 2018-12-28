import React from 'react';
import { Route, Redirect } from 'react-router-dom';

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
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
};
