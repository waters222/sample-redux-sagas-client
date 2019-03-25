import * as React from 'react';
import {
    Alert,
    Button,
    Checkbox,
    Dropdown,
    Form,
    Icon,
    Input,
    Layout,
} from 'antd';
import { AccountActions } from '../stores/account/actions';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { FormComponentProps } from 'antd/lib/form';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import './login.less';
import { Menu } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { ApplicationState } from '../stores';
import {
    getLoginError,
    isLogin,
    isLoginRequesting,
} from '../stores/account/selectors';
import { ErrorAjax } from '../services';
import { Redirect } from 'react-router';
import { LanguageActions } from '../stores/language/actions';
import { ClickParam } from 'antd/lib/menu';
import { Languages } from '../utils/language-helpers';

const { Header, Content } = Layout;

interface Props extends FormComponentProps, InjectedIntlProps {
    login: (name: string, password: string) => void;
    changeLanguage: (lang: string) => void;
    logout: () => void;
    bIsLogin: boolean;
    bLoginRequesting: boolean;
    loginError: ErrorAjax | undefined;
}

// interface States {
//     userName: string;
//     password: string;
// }

class Login extends React.Component<Props> {
    // constructor(props: Props) {
    //     super(props);
    //     this.state = {
    //         userName: '',
    //         password: '',
    //     };
    // }
    //
    // public onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    //     this.setState({ userName: e.target.value });
    // };
    //
    // public onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    //     this.setState({ password: e.target.value });
    // };

    public onChangeRememberMe = (e: CheckboxChangeEvent) => {
        console.log(`remember me: ${e.target.checked}`);
    };

    public onSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.login(values.userName, values.password);
            }
        });
    };

    public onChangeLanguage = (e: ClickParam) => {
        this.props.changeLanguage(e.key);
    };

    public langMenu = () => {
        const menuItems = [];
        for (const lang of Languages) {
            menuItems.push(
                <Menu.Item key={lang.key}>
                    <FormattedMessage id={lang.name} />
                </Menu.Item>
            );
        }
        return (
            <Menu className="dropdown-menu" onClick={this.onChangeLanguage}>
                {menuItems}
            </Menu>
        );
    };

    public render() {
        const { getFieldDecorator } = this.props.form;
        const { intl, bLoginRequesting, loginError, bIsLogin } = this.props;
        if (bIsLogin) {
            return <Redirect to="/dashboard" />;
        }
        return (
            <Layout className="layout-top-layer">
                <Header className="header-light">
                    <div className="header-index">
                        <div className="header-index-right">
                            <Dropdown overlay={this.langMenu}>
                                <span className="index-action lang-select-dropdown">
                                    <Icon type="global" />
                                </span>
                            </Dropdown>
                        </div>
                    </div>
                </Header>
                <Content>
                    <Layout>
                        <Header className="header-light header-index-center">
                            <span className="header-title">
                                <FormattedMessage id="client_title" />
                            </span>
                        </Header>
                        <Content>
                            <div className="header-desc">
                                <FormattedMessage id="client_desc" />
                            </div>
                            <div className="container">
                                {loginError !== undefined ? (
                                    <Alert
                                        showIcon={true}
                                        type="error"
                                        message={intl.formatMessage({
                                            id: loginError.id,
                                        })}
                                    />
                                ) : null}
                                <Form className="login-form">
                                    <Form.Item>
                                        {getFieldDecorator('userName', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: intl.formatMessage(
                                                        {
                                                            id:
                                                                'login_username_input_error_empty',
                                                        }
                                                    ),
                                                },
                                            ],
                                        })(
                                            <Input
                                                placeholder={intl.formatMessage(
                                                    {
                                                        id:
                                                            'login_input_placeholder_user_name',
                                                    }
                                                )}
                                                size="large"
                                                prefix={
                                                    <Icon
                                                        type="user"
                                                        style={{
                                                            color:
                                                                'rgba(0,0,0,.25)',
                                                        }}
                                                    />
                                                }
                                            />
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        {getFieldDecorator('password', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: intl.formatMessage(
                                                        {
                                                            id:
                                                                'login_password_input_error_empty',
                                                        }
                                                    ),
                                                },
                                            ],
                                        })(
                                            <Input
                                                placeholder={intl.formatMessage(
                                                    {
                                                        id:
                                                            'login_input_placeholder_password',
                                                    }
                                                )}
                                                type="password"
                                                size="large"
                                                prefix={
                                                    <Icon
                                                        type="lock"
                                                        style={{
                                                            color:
                                                                'rgba(0,0,0,.25)',
                                                        }}
                                                    />
                                                }
                                            />
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        <div style={{ float: 'left' }}>
                                            <Checkbox
                                                onChange={
                                                    this.onChangeRememberMe
                                                }
                                            >
                                                <FormattedMessage id="login_remember_me" />
                                            </Checkbox>
                                        </div>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button
                                            htmlType="submit"
                                            type="primary"
                                            onClick={this.onSubmit}
                                            className="login-form-button"
                                            size="large"
                                            loading={bLoginRequesting}
                                        >
                                            <FormattedMessage id="submit" />
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    login: (name: string, password: string) =>
        dispatch(AccountActions.login(name, password)),
    changeLanguage: (lang: string) =>
        dispatch(LanguageActions.changeLanguage(lang)),
});

const mapStateToProps = ({ account }: ApplicationState) => ({
    bLoginRequesting: isLoginRequesting(account),
    loginError: getLoginError(account),
    bIsLogin: isLogin(account),
});

const WrappedLoginForm = Form.create({ name: 'login_form' })(Login);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(WrappedLoginForm));
