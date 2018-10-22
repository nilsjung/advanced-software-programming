import React from 'react';



class Register extends React.Component {
    render() {
        return (
            <div className='container'>
                <h1>Login/Register</h1>
                <form>
                    <div class='form-group'>
                        <label for='registrationEmail'>Email address</label>
                        <input type='email' class='form-control' id='registrationEmail' aria-describedby='emailHelp' placeholder='Enter email' />
                        <small id='emailHelp' class='form-text text-muted'>We'll never share your email with anyone else.</small>
                    </div>
                    <div class='form-group'>
                        <label for='registrationPassword'>Password</label>
                        <input type='password' class='form-control' id='registrationPassword' placeholder='Password' />
                    </div>
                    <button type='submit' class='btn btn-primary'>Register</button>
                </form>
            </div>
        );
    }
}

export default Register;