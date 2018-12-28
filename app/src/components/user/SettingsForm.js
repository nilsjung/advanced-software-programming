import React from 'react';
import Button from '../mixins/Button';
import Input from '../mixins/Input';

export default class SettingsForm extends React.Component {
    render() {
        const { user } = this.props;
        return (
            <form>
                <div className="row">
                    <div className="col">
                        <Input
                            placeholder="Firstname"
                            onChange={this.props.onChange('firstname')}
                            defaultValue={user.firstname}
                            label="First Name"
                            id="settingsFirstname"
                        />
                    </div>
                    <div className="col">
                        <Input
                            placeholder="Lastname"
                            onChange={this.props.onChange('lastname')}
                            defaultValue={user.lastname}
                            label="Last Name"
                            id="settingsLastname"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Input
                            placeholder="Email"
                            onChange={this.props.onChange('email')}
                            defaultValue={user.email}
                            label="E-Mail"
                            id="settingsEmail"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Input
                            placeholder="Password"
                            onChange={this.props.onChange('password')}
                            defaultValue={user.password}
                            label="Password"
                            type="password"
                            id="settingsPassword"
                        />
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col">
                        <Input
                            placeholder="Nickname"
                            onChange={this.props.onChange('nickname')}
                            label="Nickname"
                            defaultValue={user.nickname}
                            id="settingsNickname"
                        />
                    </div>
                </div>
                <Button onClick={this.props.onSubmit} label="Send" />
            </form>
        );
    }
}
