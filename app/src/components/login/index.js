import React from 'react';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';

// for redirect
import { browserHistory } from 'react-router';

import * as userActionCreators from '../../actions/userActions';

import Input from '../mixins/Input';

class Login extends React.Component {

    onSubmit = (event) => {
        event.preventDefault();

        const user = {
            password: document.getElementById('passwordLogin').value,
            email: document.getElementById('emailLogin').value
        }

        return this.props.login(user);
    }

    render() {

        const message = this.props.infoMessage;
        const loading = this.props.isLoading ? <div>Loading...</div> : ''
        const messageClass = 'alert ' + (this.props.isSuccess ? 'alert-success' : 'alert-danger');
        return (
            <div className='container loginForm'>
                <div className='card'>
                    <div className='h4 card-header'>Login</div>
                    <div className='card-body'>
                    {loading}
                    <div className={messageClass} role='alert'>
                        {message}
                    </div>
                        <form>
                            <Input placeholder='Enter your E-mail...' label='Email' Id='emailLogin' type='email' />
                            <Input placeholder='******' label='Password' Id='passwordLogin' type='password' />
                            <button type="submit" onClick={this.onSubmit} className="login btn btn-info"><span>Login</span><i className='fa fa-arrow-right'></i></button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        messages: state.messages,
        currentMessage: state.currentMessage,
        isSuccess: state.isSuccess,
        infoMessage: state.infoMessage,
        isLoading: state.isLoading,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: (user) => dispatch(userActionCreators.login(user)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));