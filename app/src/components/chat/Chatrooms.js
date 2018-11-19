import React from 'react';
import {connect} from 'react-redux';

class Chatrooms extends React.Component {

    renderChatrooms = () => {
        return (
            <ul class="nav">
            <li class="nav-item">
            <a class="nav-link active" href="#">Active</a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
            <a class="nav-link disabled" href="#">Disabled</a>
            </li>
            </ul>
         )
    }

    render() {
        return (
            <div className='container'>

            {this.renderChatrooms()}

            <div className='input-group mb-3'>
            <input
                id='messageInput'
                className='form-control'
                type='text'
                // value={this.props.value}
                // onKeyPress={this.handleKeyPress}
                // onChange={this.handleChange}
                placeholder='Create Chatroom...'>
            </input>
            <div className='input-group-append'>
            <button className='btn btn-primary'
        type='button'
       // onClick={this.handleClick}
            >
            <i className='fa fa-paper-plane'></i></button>
        </div>
        </div>
        </div>
    )
    }


}

export default Chatrooms;