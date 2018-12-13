import React from 'react';

import Input from '../mixins/Input';
import Button from '../mixins/Button';

class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            password: '',
            email: '',
        };
    }

    onChange = (key) => (value) => {
        const newValue = value;
        this.setState(() => {
            return {
                [key]: newValue,
            };
        });
    };

    handleSubmit = (event) => {
        this.props.onSubmit({ ...this.state });
        event.preventDefault();
    };

    render() {
        return (
            <form>
                <Input
                    onChange={this.onChange('email')}
                    label="Email Address"
                    Id="registrationEmail"
                    placeholder="Email"
                />
                <Input
                    onChange={this.onChange('firstname')}
                    label="First Name"
                    Id="firstName"
                    placeholder="Enter your first name"
                />
                <Input
                    onChange={this.onChange('lastname')}
                    label="Last Name"
                    Id="lastName"
                    placeholder="Enter your last name"
                />
                <Input
                    onChange={this.onChange('password')}
                    type="password"
                    label="Password"
                    Id="password"
                    placeholder="Enter your password"
                />
                <Button onClick={this.handleSubmit} label="Registration" />
            </form>
        );
    }
}

export default RegistrationForm;
