import * as React from 'react';
import { Dispatch } from 'redux';
import { ApplicationState } from '../stores';
import { connect } from 'react-redux';
import { LanguageActions } from '../stores/language/actions';
import { Dropdown, Icon, Layout, Menu } from 'antd';
import './home.less';
import { Redirect, Route, Switch } from 'react-router';
import Account from './account';
import { NotFound } from './not-fount';
import { isLogin } from '../stores/account/selectors';

const { Header, Sider, Content } = Layout;

interface Props {
    readonly language: string;
    readonly userName: string | undefined;
    readonly bIsLogin: boolean;
    changeLanguage: (language: string) => void;
}

interface States {
    collapsed: boolean;
}

class Home extends React.Component<Props, States> {
    constructor(props: Props) {
        super(props);
        this.state = {
            collapsed: false,
        };
    }

    public switchLan = () => {
        if (this.props.language === 'zh_CN') {
            this.props.changeLanguage('en_US');
        } else {
            this.props.changeLanguage('zh_CN');
        }
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

    public langMenu = () => {
        return (
            <Menu className="dropdown-menu">
                <Menu.Item>English</Menu.Item>
                <Menu.Item>Chinese</Menu.Item>
            </Menu>
        );
    };

    public accountMenu = () => {
        return (
            <Menu className="dropdown-menu">
                <Menu.Item>
                    <Icon type="user" />
                    Account Info
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item>
                    <Icon type="logout" />
                    Logout
                </Menu.Item>
            </Menu>
        );
    };

    public render() {
        if (!this.props.bIsLogin) {
            return <Redirect to="/login" />;
        }
        return (
            <Layout className="home">
                <Sider
                    trigger={null}
                    collapsible={true}
                    collapsed={this.state.collapsed}
                >
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
                    <Header
                        style={{
                            background: '#fff',
                            padding: 0,
                            width: '100%',
                        }}
                    >
                        <div className="header_index">
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
                            <Route path="/account" component={Account} />
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
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
