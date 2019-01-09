import React from 'react';

import { connect } from 'react-redux';
import { selectUsers, getUsers } from '../../actions/userActions';
import { createChatId } from '../../helper/chat';
import { openUserChat, addUserToChatroom } from '../../actions/chatroomActions';
import { User } from './User';

/**
 * Represents the **UserList Component**
 *
 * Renders the user that are registered in the list.
 * handles the chatroom selection and also enables that users can be added to a chatroom.
 */
class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.props.loadUsers(this.props.accessToken);
        this.state = {
            query: '',
        };
    }

    handleClick = (user) => {
        const currentUser = { ...this.props.user, role: 'ADMIN' };

        const otherUser = this.props.users.filter(
            (item) => item.email === user.email
        );

        const chatPartner = { ...otherUser[0], role: 'USER' };

        const id = createChatId([currentUser, chatPartner]);
        const chatExists = this.props.userchats.reduce(
            (acc, curr) => (curr !== null && curr.id === id) || acc,
            false
        );
        // create new user chat if it does not exist yet
        if (!chatExists) {
            this.props.handleItemClick({
                chatroom: currentUser.name + ' + ' + chatPartner.name,
                users: [currentUser, chatPartner],
                token: this.props.accessToken,
            });
        }
        // else just open chat
        else {
            this.props.openUserChat(id, this.props.accessToken);
        }
    };

    handleChange = (event) => {
        this.setState({ query: event.target.value });
        const query = event.target.value.toLowerCase();
        let users = this.props.users.filter((user) => {
            return user.email.indexOf(query) !== -1;
        });

        this.props.selectUsers(users);
    };

    addUserToChatroomButton = (user) => {
        return () =>
            this.props.addUserToChatroom({
                userid: user.email,
                chatroom: this.props.currentChatroom,
                token: this.props.accessToken,
            });
    };

    renderUsers = () => {
        const list = [];
        if (this.props.selectedUsers !== undefined) {
            this.props.selectedUsers.forEach((user) => {
                list.push(
                    <User
                        key={user._id}
                        user={user}
                        handleClick={this.handleClick}
                        addUserToChatroomButton={this.addUserToChatroomButton}
                    />
                );
            });
        }
        console.log(list);
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

function mapStateToProps(state) {
    return {
        currentChatroom: state.currentChatroom,
        users: state.users,
        selectedUsers: state.selectedUsers,
        accessToken: state.accessToken,
        user: state.user,
        userchats: state.userchats,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addUserToChatroom: (data) => dispatch(addUserToChatroom(data)),
        openUserChat: (id, token) => dispatch(openUserChat(id, token)),
        loadUsers: (user) => dispatch(getUsers(user)),
        selectUsers: (users) => dispatch(selectUsers(users)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserList);
