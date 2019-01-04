import React from 'react';
import { connect } from 'react-redux';

import { onlinestatus } from './../../config';
import { setOnlineStatus } from '../../actions/userActions';

class UserInformationField extends React.Component {
    render() {
        const { user } = this.props;

        if (!user.onlinestatus) {
            return '';
        }

        return (
            <div className="row userInformation">
                <div className="col-2">
                    {user.firstname} {user.lastname}
                </div>
                <OnlineStatusSelect
                    onStatusChange={this.props.onStatusChange}
                    onlinestatus={user.onlinestatus}
                    user={user}
                />
            </div>
        );
    }
}

class OnlineStatusSelect extends React.Component {
    onClick = (status) => () => {
        // exclude password of user
        const user = {
            _id: this.props.user._id,
            firstname: this.props.user.firstname,
            lastname: this.props.user.lastname,
            email: this.props.user.email,
            __v: this.props.user.__v,
            onlinestatus: this.props.user.onlinestatus,
        };
        return this.props.onStatusChange(user, status);
    };

    renderItems = () => {
        let status = [];
        for (let key in onlinestatus) {
            const value = onlinestatus[key];
            let entry = (
                <a
                    key={key}
                    onClick={this.onClick(value)}
                    className="dropdown-item"
                    href="#"
                >
                    {value}
                </a>
            );
            status.push(entry);
        }
        return status;
    };

    render() {
        const dropdownId = 'onlinstatusSelect';
        return (
            <div>
                <div className="btn-group dropright">
                    <button
                        className="btn btn-sm btn-primary dropdown-toggle"
                        id={dropdownId}
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        {this.props.onlinestatus}
                    </button>
                    <div className="dropdown-menu" aria-labelledby={dropdownId}>
                        {this.renderItems()}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onStatusChange: (user, status) => {
            dispatch(setOnlineStatus(user, status));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserInformationField);
