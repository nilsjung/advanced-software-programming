import React from 'react';
import {connect} from 'react-redux'

import { bindActionCreators } from 'redux';

import Input from '../mixins/Input';

class Login extends React.Component {
    render() {
        return (
            <div className='container loginForm'>
                <div className='card'>
                    <div className='h4 card-header'>Login</div>
                    <div className='card-body'>
                        <form>
                            <Input placeholder='Enter your E-mail...' label='Email' Id='emailLogin' type='email' />
                            <Input placeholder='******' label='Password' Id='passwordLogin' type='password' />
                            <button type="submit" class="login btn btn-info"><span>Login</span><i className='fa fa-arrow-right'></i></button>
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
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
