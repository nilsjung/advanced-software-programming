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
            let navlinkClass = 'dropdown-item';

            if (room.name === this.props.currentChatroom) {
                navlinkClass += ' active';
            }

            return (
                <li key={room.name} className="nav-item">
                    <span className="row">
                        <span className="col-8">
                            <a
                                onClick={this.handleChangeChatroom(room.name)}
                                className={navlinkClass}
                                href="#"
                            >
                                {room.name}
                            </a>
                        </span>
                        <span className="col-4">
                            <button className="btn btn-sm btn-danger">
                                <span>
                                    <i className="fa fa-trash-o" />
                                </span>
                            </button>
                        </span>
                    </span>
                </li>
            );
        });
    };

    render() {
        const dropdownId = 'chatroom-dropdown';

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
                        Select Chatroom
                    </button>
                    <div className="dropdown-menu" aria-labelledby={dropdownId}>
                        <h6 className="dropdown-header">Create</h6>
                        <InputWithButton
                            onSubmit={this.onSubmit}
                            onChange={this.onChange}
                            icon="fa fa-plus-square-o"
                        />
                        <div className="dropdown-divider" />
                        <h6 className="dropdown-header">Select</h6>
                        {this.renderChatrooms()}
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
