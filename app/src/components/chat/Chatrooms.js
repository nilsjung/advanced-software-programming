import React from 'react';
import { connect } from 'react-redux';
import InputWithButton from '../mixins/InputWithButton';

class Chatrooms extends React.Component {
    handleChangeChatroom = (room) => {
        return () => {
            this.props.changeChatroom(room);
        };
    };

    onSubmit = (value) => {
        const roomName = value;

        if (roomName) {
            this.props.createChatroom({
                chatroom: roomName,
                token: this.props.accessToken,
            });
        }
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
                <InputWithButton
                    onSubmit={this.onSubmit}
                    onChange={this.onChange}
                />
            </div>
        );
    }
}

export default connect(({ currentChatroom, accessToken }) => ({
    currentChatroom,
    accessToken,
}))(Chatrooms);
