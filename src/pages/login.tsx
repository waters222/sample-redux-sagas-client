import * as React from 'react';
import { Button, Form, Icon, Input, Layout } from 'antd';
import './login.less';
import { ChangeEvent } from 'react';
import { AccountActions } from '../stores/account/actions';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { FormComponentProps } from 'antd/lib/form';

interface Props extends FormComponentProps {
    login: (name: string, password: string) => void;
    logout: () => void;
}

interface States {
    userName: string;
    password: string;
}

class Login extends React.Component<Props, States> {
    constructor(props: Props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
        };
    }
    public loginSubmit = () => {
        console.log('login submit');
        this.props.login('test', '123321');
    };

    public logoutSubmit = () => {
        this.props.logout();
    };

    public onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ userName: e.target.value });
    };

    public onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ password: e.target.value });
    };

    public onSubmit = () => {
        console.log('login submitted');
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(`login successful: ${values}`);
            }
        });
    };

    public render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Layout className="layout-top-layer">
                <Form className="login-form">
                    <Form.Item>
                        {getFieldDecorator('userName', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ],
                        })(
                            <Input
                                placeholder="admin"
                                prefix={
                                    <Icon
                                        type="user"
                                        style={{
                                            color: 'rgba(0,0,0,.25)',
                                        }}
                                    />
                                }
                                onChange={this.onChangeUserName}
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ],
                        })(
                            <Input
                                placeholder="admin"
                                type="password"
                                prefix={
                                    <Icon
                                        type="lock"
                                        style={{
                                            color: 'rgba(0,0,0,.25)',
                                        }}
                                    />
                                }
                                onChange={this.onChangePassword}
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button
                            htmlType="submit"
                            type="primary"
                            onClick={this.onSubmit}
                            className="login-form-button"
                        >
                            submit
                        </Button>
                    </Form.Item>
                </Form>
            </Layout>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    login: (name: string, password: string) =>
        dispatch(AccountActions.login(name, password)),
    logout: () => dispatch(AccountActions.logout()),
});

const WrappedLoginForm = Form.create({ name: 'login_form' })(Login);

export default connect(
    null,
    mapDispatchToProps
)(WrappedLoginForm);
