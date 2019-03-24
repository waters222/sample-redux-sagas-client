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
import { ClickParam } from 'antd/lib/menu';
import { Languages } from '../utils/language-helpers';
import Home from './dashboard/home';

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
        this.props.history.push(`${this.props.match.url}/account`);
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
        return (
            <Layout className="layout-top-layer">
                <Sider
                    trigger={null}
                    collapsible={true}
                    collapsed={this.state.collapsed}
                >
                    <div className="logo" onClick={this.onClickLogo}>
                        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K" />
                        <FormattedMessage id="client_title" />
                    </div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                    >
                        <Menu.Item key="1">
                            <Icon type="user" />
                            <span>nav 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="video-camera" />
                            <span>nav 2</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="upload" />
                            <span>nav 3</span>
                        </Menu.Item>
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
                                path={`${match.url}/account`}
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
