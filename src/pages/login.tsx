import * as React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Button from 'antd/es/button';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AccountActions } from '../stores/account/actions';

interface Props {
    login: (name: string, password: string) => void;
    logout: () => void;
}
class Login extends React.Component<Props> {
    public loginSubmit = () => {
        console.log('login submit');
        this.props.login('test', '123321');
    };

    public logoutSubmit = () => {
        this.props.logout();
    };

    public render() {
        return (
            <div>
                <p>login page</p>
                <FormattedMessage id="app.test.message1" />
                <br />
                <Link to="/">to home</Link>
                <Button
                    type="default"
                    htmlType="button"
                    onClick={this.loginSubmit}
                >
                    <FormattedMessage id="app.login" />
                </Button>
                <Button
                    type="default"
                    htmlType="button"
                    onClick={this.logoutSubmit}
                >
                    <FormattedMessage id="app.logout" />
                </Button>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    login: (name: string, password: string) =>
        dispatch(AccountActions.login(name, password)),
    logout: () => dispatch(AccountActions.logout()),
});
export default connect(
    null,
    mapDispatchToProps
)(Login);
