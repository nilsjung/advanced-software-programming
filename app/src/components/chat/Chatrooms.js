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
        this.setState({ chatroomName: event.target.value });
    };

    handleKeyPress = (event) => {
        if (event.which === 13) {
            const accessToken = this.props.accessToken;
            const message = this.state.chatroomName.trim();
            if (message) {
                this.props.createChatroom({
                    chatroom: message,
                    token: accessToken,
                });
            }
            event.preventDefault();
        }
    };

    handleClick = (event) => {
        const message = this.state.chatroomName.trim();
        if (message) {
            this.props.createChatroom({
                chatroom: message,
                token: this.props.accessToken,
            });
        }
        event.preventDefault();
    };

    renderChatrooms = () => {
        return this.props.chatrooms.map((room) => {
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
                <ul className="nav nav-tabs">{this.renderChatrooms()}</ul>
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

export default connect(({ currentChatroom, accessToken }) => ({
    currentChatroom,
    accessToken,
}))(Chatrooms);
