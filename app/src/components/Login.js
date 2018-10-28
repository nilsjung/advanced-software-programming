import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import * as actions from '../actions/registerActions';

class Register extends React.Component {
    handleSubmitButton = (event) => {
        event.preventDefault();
        const user = {
            firstname: document.getElementById('registrationFirstname').value,
            lastname: document.getElementById('registrationLastname').value,
            password: document.getElementById('registrationPassword').value,
            email: document.getElementById('registrationEmail').value
        }

        return this.props.registerUser(user)
    }

    render() {
        let alert;
        if (this.props.hasErrored) {

            alert = <div class='alert alert-danger'>this.props.message</div>

        } else if (this.props.hasSucceeded) {

            alert = <div class='alert alert-success'>{this.props.message}</div>

        }

        if (this.props.isLoading) {
            return (<p>loading...</p>)
        }

        return (
            <div className='container'>
                <div className='h2'>Login/Register</div>
                <div>{alert}</div>

                <div className='container'>{this.props.message}</div>

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
        user: state.user,
        hasErrored: state.hasErrored,
        isLoading: state.isLoading,
        hasSucceeded: state.isSuccess,
        message: state.infoMessage,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        registerUser: (user) =>  dispatch(actions.registerUser(user)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));