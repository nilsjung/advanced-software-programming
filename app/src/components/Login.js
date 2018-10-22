import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import * as actions from '../actions/register-actions';

class Register extends React.Component {

    register = (user) => {
        this.props.registerUser(user)
    }

    handleSubmitButton = (event) => {
        event.preventDefault();
        const user = {
            firstname: '',
            lastname: '',
            password: '',
            email: ''
        }

        return this.register(user)
    }

    render() {
        return (
            <div className='container'>
                <div className='h2'>Login/Register</div>
                <form>
                    <div className='form-group'>
                        <label htmlFor='registrationEmail'>Email address</label>
                        <input type='email' className='form-control' id='registrationEmail' aria-describedby='emailHelp' placeholder='Enter your email' />
                        <small id='emailHelp' className='form-text text-muted'>We'll never share your email with anyone else.</small>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='registrationFirstname'>First Name</label>
                        <input type='text' className='form-control' id='registrationFirstname' aria-describedby='' placeholder='Enter yourt first name' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='registrationLastname'>Last Name</label>
                        <input type='text' className='form-control' id='registrationLastname' aria-describedby='emailHelp' placeholder='Enter your last name' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='registrationPassword'>Password</label>
                        <input type='password' className='form-control' id='registrationPassword' placeholder='Password' />
                    </div>
                    <button className='btn btn-primary' onClick={this.handleSubmitButton}>Register</button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        userId: state.userId,
        messages: state.messages,
        currentMessage: state.currentMessage
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        registerUser: actions.registerUser,
    }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));