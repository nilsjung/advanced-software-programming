import React from 'react';
import { connect } from 'react-redux';

class Chatrooms extends React.Component {
    constructor(props) {
        super(props);
        this.state = { chatroomName: '' };
    }

    handleChangeChatroom = (room) => {
        return () => {
            this.props.changeChatroom(room);
        };
    };

    handleChange = (event) => {
        console.log('input');
        this.setState({ chatroomName: event.target.value });
    };

    createChatRoom = () => {
        const message = this.state.chatroomName.trim();
        const user = {
            name: this.props.user.firstname + ' ' + this.props.user.lastname,
            email: this.props.user.email,
            role: 'ADMIN',
        };
        console.log(user);
        if (message) {
            this.props.createChatroom({
                chatroom: message,
                user: user,
                token: this.props.accessToken,
            });
        }
    };

    handleKeyPress = (event) => {
        if (event.which === 13) {
            this.createChatRoom();
        }
    };

    handleClick = (event) => {
        this.createChatRoom();
        event.preventDefault();
    };

    renderChatrooms = () => {
        const relevantChatrooms = this.props.chatrooms.filter((chatroom) => {
            return chatroom.users.reduce(
                (acc, curr) =>
                    (curr !== null && curr.email === this.props.user.email) ||
                    acc,
                false
            );
        });
        return relevantChatrooms.map((room) => {
            let navlinkClass = 'nav-link';

            if (room.name === this.props.currentChatroom) {
                navlinkClass += ' active';
            }
            return (
                <li key={room.name} className="nav-item">
                    <a
                        onClick={this.handleChangeChatroom(room.name)}
                        className={navlinkClass}
                        href="#"
                    >
                        {room.name}
                    </a>
                </li>
            );
        });
    };

    render() {
        return (
            <div className="container">
                <ul className="nav nav-tabs"> {this.renderChatrooms()} </ul>
                <div className="input-group mb-3">
                    <input
                        id="messageInput"
                        className="form-control"
                        type="text"
                        value={this.state.chatroomName}
                        onKeyPress={this.handleKeyPress}
                        onChange={this.handleChange}
                        placeholder="Create Chatroom..."
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={this.handleClick}
                        >
                            <i className="fa fa-plus-square" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(({ currentChatroom, accessToken, user }) => ({
    currentChatroom,
    accessToken,
    user,
}))(Chatrooms);
