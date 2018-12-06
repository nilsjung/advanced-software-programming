import React from 'react';

import { connect } from 'react-redux';
import { selectUsers } from '../../actions/userActions';

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.props.loadUsers();
        this.state = {
            query: '',
        };
    }

    handleItemClick = (user) => {
        this.props.handleItemClick({
            chatroom: user,
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
        this.props.selectedUsers.forEach((user) => {
            list.push(
                <li
                    key={user}
                    className="list-group-item"
                    onClick={() => this.handleItemClick(user)}
                >
                    {user}
                </li>
            );
        });
        return list;
    };

    render() {
        return (
            <div className="container">
                <input
                    className="form-control"
                    type="text"
                    onChange={this.handleChange}
                    placeholder="Search for user.."
                />
                <ul className="list-group">{this.renderUsers()}</ul>
            </div>
        );
    }
}

export default connect(({ users, selectedUsers, accessToken }) => ({
    users,
    selectedUsers,
    accessToken,
}))(UserList);
