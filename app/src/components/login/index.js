import React from 'react';
import {connect} from 'react-redux'

import { bindActionCreators } from 'redux';

import Input from '../mixins/Input';
import { login } from '../../actions/userActions';

class Login extends React.Component {

    onSubmit = (event) => {
        event.preventDefault();

        const user = {
            password: document.getElementById('passwordLogin'),
            email: document.getElementById('emailLogin')
        }

        return (dispatch) => dispatch(this.props.login(this.props.user));
    }

    render() {
        return (
            <div className='container loginForm'>
                <div className='card'>
                    <div className='h4 card-header'>Login</div>
                    <div className='card-body'>
                        <form>
                            <Input placeholder='Enter your E-mail...' label='Email' Id='emailLogin' type='email' />
                            <Input placeholder='******' label='Password' Id='passwordLogin' type='password' />
                            <button type="submit" onSubmit={this.onSubmit} className="login btn btn-info"><span>Login</span><i className='fa fa-arrow-right'></i></button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        login: login,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
