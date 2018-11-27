import React from 'react';

import { connect } from 'react-redux';

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: ['hans', 'rolf', 'sven'],
            selectedUsers: ['hans', 'rolf', 'sven'],
            query: '',
        };
    }

    handleChange = (event) => {
        this.setState({ query: event.target.value });
        const query = event.target.value.toLowerCase();
        const users = this.state.users.filter(
            (user) => user.indexOf(query) !== -1
        );
        this.setState({ selectedUsers: users });
    };
    renderUsers = () => {
        const list = this.state.selectedUsers.map((user) => {
            return (
                <li key={user} className="list-group-item">
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
                    placeholder="Search.."
                />
                <ul className="list-group">{this.renderUsers()}</ul>
            </div>
        );
    }
}

export default UserList;
