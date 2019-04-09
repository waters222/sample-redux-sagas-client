import * as React from 'react';
import { Dispatch } from 'redux';
import { ApplicationState } from '../stores';
import { connect } from 'react-redux';
import { LanguageActions } from '../stores/language/actions';
import { Dropdown, Icon, Layout, Menu } from 'antd';
import './dashboard.less';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router';
import Account from './account/account';
import NotFound from './not-found';
import { isLogin } from '../stores/account/selectors';
import { AccountActions } from '../stores/account/actions';
import { FormattedMessage } from 'react-intl';
import { ClickParam, SelectParam } from 'antd/lib/menu';
import { Languages } from '../utils/language-helpers';
import Home from './dashboard/home';
import logo from '../assets/images/logo.svg';
import SubMenu from 'antd/lib/menu/SubMenu';
import StepForm from './step-form/step-form';

const { Header, Sider, Content } = Layout;

interface Props extends RouteComponentProps {
    readonly language: string;
    readonly userName: string | undefined;
    readonly bIsLogin: boolean;
    changeLanguage: (language: string) => void;
    logout: () => void;
}

interface States {
    collapsed: boolean;
}

class Dashboard extends React.Component<Props, States> {
    constructor(props: Props) {
        super(props);
        this.state = {
            collapsed: false,
        };
    }

    public onChangeLanguage = (e: ClickParam) => {
        this.props.changeLanguage(e.key);
    };

    public shouldComponentUpdate(
        nextProps: Props,
        nextState: States,
        nextContext: any
    ): boolean {
        return this.props.language === nextProps.language;
    }

    public toggle = () => {
        this.setState({ collapsed: !this.state.collapsed });
    };

    public onClickLogo = () => {
        this.props.history.push(`${this.props.match.url}`);
    };

    public onClickLogout = () => {
        this.props.logout();
    };

    public onClickAccountInfo = () => {
        this.props.history.push(`${this.props.match.url}/account/info`);
    };

    public getMenuKeysFromPath = (props: Props) => {
        const path = props.location.pathname.replace(props.match.url, '');
        const selectedKey = path.length === 0 ? '/' : path;
        const temp = selectedKey.split('/');
        if (temp.length > 2) {
            return {
                selectedKey: selectedKey,
                openKey: `/${temp[1]}`,
            };
        } else {
            return {
                selectedKey: selectedKey,
                openKey: '/',
            };
        }
    };

    public onSelect = (selection: SelectParam) => {
        const url = selection.key === '/' ? '' : selection.key;
        this.props.history.push(`${this.props.match.url}${url}`);
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

    public accountMenu = () => {
        return (
            <Menu className="dropdown-menu">
                <Menu.Item onClick={this.onClickAccountInfo}>
                    <Icon type="user" />
                    <FormattedMessage id="account_info" />
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item onClick={this.onClickLogout}>
                    <Icon type="logout" />
                    <FormattedMessage id="logout" />
                </Menu.Item>
            </Menu>
        );
    };

    public render() {
        if (!this.props.bIsLogin) {
            return <Redirect to="/" />;
        }
        const { match } = this.props;
        const { selectedKey, openKey } = this.getMenuKeysFromPath(this.props);
        return (
            <Layout className="layout-top-layer">
                <Sider
                    trigger={null}
                    collapsible={true}
                    collapsed={this.state.collapsed}
                >
                    <div className="logo" onClick={this.onClickLogo}>
                        <img src={logo} />
                        <FormattedMessage id="client_title" />
                    </div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        onSelect={this.onSelect}
                        defaultOpenKeys={[openKey]}
                        selectedKeys={[selectedKey]}
                    >
                        <Menu.Item key="/">
                            <Icon type="dashboard" />
                            <FormattedMessage id="dashboard" />
                        </Menu.Item>
                        <Menu.Item key="/step-form/start">
                            <Icon type="form" />
                            <FormattedMessage id="step-form" />
                        </Menu.Item>
                        <SubMenu
                            title={
                                <span>
                                    <Icon type="user" />
                                    <span>
                                        <FormattedMessage id="account" />
                                    </span>
                                </span>
                            }
                            key="/account"
                        >
                            <Menu.Item key="/account/info">
                                <span>
                                    <FormattedMessage id="account_info" />
                                </span>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Header className="header-white header-index">
                        <div className="header-index-box-shadow">
                            <span
                                className="header-index-trigger"
                                onClick={this.toggle}
                            >
                                <Icon
                                    className="trigger"
                                    type={
                                        this.state.collapsed
                                            ? 'menu-unfold'
                                            : 'menu-fold'
                                    }
                                />
                            </span>
                            <div className="header-index-right">
                                <Dropdown overlay={this.accountMenu}>
                                    <span className="index-action">
                                        <Icon type="user" />
                                        <span className="user-name">
                                            {this.props.userName}
                                        </span>
                                    </span>
                                </Dropdown>
                                <Dropdown overlay={this.langMenu}>
                                    <span className="index-action lang-select-dropdown">
                                        <Icon type="global" />
                                    </span>
                                </Dropdown>
                            </div>
                        </div>
                    </Header>
                    <Content className="content">
                        <Switch>
                            <Route
                                exact={true}
                                path={`${match.url}`}
                                component={Home}
                            />
                            <Route
                                path={`${match.url}/step-form/start`}
                                component={StepForm}
                            />
                            <Route
                                path={`${match.url}/account/info`}
                                component={Account}
                            />
                            <Route component={NotFound} />
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = ({ language, account }: ApplicationState) => ({
    language: language.language,
    userName: account.name,
    bIsLogin: isLogin(account),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    changeLanguage: (language: string) =>
        dispatch(LanguageActions.changeLanguage(language)),
    logout: () => dispatch(AccountActions.logout()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
