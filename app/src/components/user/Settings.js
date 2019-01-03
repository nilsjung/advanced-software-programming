import React from 'react';

import { connect } from 'react-redux';
import * as userActionCreators from '../../actions/userActions';

import profileDummy from './../../assets/profileDummy.png';
import Button from '../mixins/Button';
import SettingsForm from './SettingsForm';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: this.props.user._id,
            firstname: this.props.user.firstname,
            lastname: this.props.user.lastname,
            password: this.props.user.password,
            email: this.props.user.email,
            avatar: this.props.user.avatar,
            nickname: this.props.user.nickname,
        };
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.updateUser(this.state, this.props.authToken);
    };

    onChange = (key) => (value) => {
        this.setState({
            [key]: value,
        });
    };

    render() {
        const user = this.state;

        return (
            <div className="userSettings">
                <div className="row">
                    <div className="col-3 avatar">
                        <img src={profileDummy} alt="ProfilePicture" />
                    </div>
                    <div className="col-3">
                        <Button label="Change avatar" />
                    </div>
                </div>
                <SettingsForm
                    onSubmit={this.onSubmit}
                    onChange={this.onChange}
                    user={user}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { user: state.user, authToken: state.accessToken };
}

function mapDispatchToProps(dispatch) {
    return {
        updateUser: (user, token) =>
            dispatch(userActionCreators.updateUserProfileAction(user, token)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings);
