import React from 'react';

import { connect } from 'react-redux';
import { selectUsers } from '../../actions/userActions';

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.props.loadUsers(this.props.accessToken);
        this.state = {
            query: '',
        };
    }

    handleClick = (user) => {
        console.log(user);
        const currentUser = {
            name: this.props.user.firstname + ' ' + this.props.user.lastname,
            email: this.props.user.email,
            role: 'ADMIN',
        };
        const otherUser = this.props.users.filter(
            (item) => item.email === user
        );
        const chatPartner = {
            name: otherUser[0].firstname + ' ' + otherUser[0].lastname,
            email: otherUser[0].email,
            role: 'USER',
        };

        this.props.handleItemClick({
            chatroom: currentUser.name + ' + ' + chatPartner.name,
            users: [currentUser, chatPartner],
            token: this.props.accessToken,
        });
    };

    handleChange = (event) => {
        this.setState({ query: event.target.value });
        const query = event.target.value.toLowerCase();
        const users = this.props.users.map((user) => {
            if (user.email.indexOf(query) !== -1) {
                return user.email;
            }
        });
        this.props.dispatch(selectUsers(users));
    };

    renderUsers = () => {
        const list = [];
        if (this.props.selectedUsers !== undefined) {
            this.props.selectedUsers.forEach((user) => {
                list.push(
                    <li
                        key={user}
                        className="list-group-item"
                        onClick={() => this.handleClick(user)}
                    >
                        {user}
                    </li>
                );
            });
        }
        return list;
    };

    render() {
        const dropdownId = 'user-dropdown';

        return (
            <div className="container">
                <div className="dropdown">
                    <button
                        id={dropdownId}
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        Users
                    </button>
                    <div className="dropdown-menu" aria-labelledby={dropdownId}>
                        <h6 className="dropdown-header">Search</h6>
                        <input
                            className="form-control"
                            type="text"
                            onChange={this.handleChange}
                            placeholder="Search for user.."
                        />
                        <div className="dropdown-divider" />
                        <h6 className="dropdown-header">Select</h6>
                        {this.renderUsers()}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(({ users, selectedUsers, accessToken, user }) => ({
    users,
    selectedUsers,
    accessToken,
    user,
}))(UserList);
