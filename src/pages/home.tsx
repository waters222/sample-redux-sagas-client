import * as React from 'react';
import { Dispatch } from 'redux';
import { ApplicationState } from '../stores';
import { connect } from 'react-redux';
import { LanguageActions } from '../stores/language/actions';
import { Icon, Layout, Menu } from 'antd';
import './home.css';

const { Header, Sider, Content } = Layout;

interface Props {
    readonly language: string;
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
        nextProps: Readonly<Props>,
        nextState: Readonly<{}>,
        nextContext: any
    ): boolean {
        if (this.props.language !== nextProps.language) {
            return false;
        }
        console.log('home should change lan');
        return true;
    }

    public toggle = () => {
        this.setState({ collapsed: !this.state.collapsed });
    };

    public render() {
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
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={
                                this.state.collapsed
                                    ? 'menu-unfold'
                                    : 'menu-fold'
                            }
                            onClick={this.toggle}
                        />
                    </Header>
                    <Content
                        style={{
                            margin: '24px, 16px',
                            padding: 24,
                            background: '#fff',
                            minHeight: 280,
                        }}
                    >
                        something something
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = ({ language }: ApplicationState) => ({
    language: language.language,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    changeLanguage: (language: string) =>
        dispatch(LanguageActions.changeLanguage(language)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
