import React from 'react';

export const User = (props) => {
    const { user } = props;

    return (
        <li
            className="list-group-item  clearfix"
            onClick={() => props.handleClick(user)}
        >
            <span>{user.firstname}</span> <span>{user.lastname}</span>
            <span className="pull-right badge badge-success badge-pill">
                online
            </span>
            {props.currentChatroom !== '' ? (
                <button
                    onClick={props.addUserToChatroomButton(user)}
                    className="btn btn-sm btn-secondary-outline"
                >
                    <i className="sm fa fa-plus" />
                    <span>add</span>
                </button>
            ) : (
                ''
            )}
        </li>
    );
};
