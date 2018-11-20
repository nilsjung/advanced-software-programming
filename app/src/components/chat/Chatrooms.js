import React from 'react';
import {connect} from 'react-redux';

class Chatrooms extends React.Component {

    constructor(props) {
        super(props);
        this.state = {chatroomName: ''}
    }

    handleChangeChatroom = (room) => {
        return () => {
            console.log(room);
            this.props.changeChatroom(room);
        }
    };

    handleChange = (event) => {
        this.setState({chatroomName: event.target.value})
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
        const renderedChatrooms =
        this.props.chatrooms.map((room) => {
            if(room === this.props.currentChatroom) {
                return (
                    <li key = {room} class="nav-item">
                    <a onClick={this.handleChangeChatroom(room)} class="nav-link active" href="#">{room}</a>
                    </li>
                )
            }
            else {
                return (
                    <li key = {room} class="nav-item">
                    <a  onClick={this.handleChangeChatroom(room)} class="nav-link" href="#">{room}</a>
                    </li>
                )
            }
        });
        return renderedChatrooms;
    }

    render() {
        return (
            <div className='container'>
            <ul class="nav">
            {this.renderChatrooms()}
            </ul>
            <div className='input-group mb-3'>
            <input
                id='messageInput'
                className='form-control'
                type='text'
                value={this.state.chatroomName}
                onKeyPress={this.handleKeyPress}
                onChange={this.handleChange}
                placeholder='Create Chatroom...'>
            </input>
            <div className='input-group-append'>
            <button className='btn btn-primary'
        type='button'
        onClick={this.handleClick}><i className='fa fa-paper-plane'></i></button>
        </div>
        </div>
        </div>
    )
    }


}

export default connect(({currentChatroom, accessToken}) => ({currentChatroom, accessToken})) (Chatrooms);