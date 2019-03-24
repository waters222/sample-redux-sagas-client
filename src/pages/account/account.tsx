import * as React from 'react';
import { connect } from 'react-redux';
import { Menu } from 'antd';
import { FormattedMessage } from 'react-intl';
import { Route, RouteComponentProps, Switch } from 'react-router';
import BasicSetting from './basic-setting';
import NotFound from '../not-found';
import './account.less';
import NotificationSetting from './notification-setting';
import { SelectParam } from 'antd/lib/menu';

interface Props extends RouteComponentProps {
    nothing: boolean;
}

class Account extends React.Component<Props> {
    public getPath = (props: Props) => {
        const path = props.location.pathname.replace(props.match.url, '');
        return path.length === 0 ? '/' : path;
    };

    public onSelect = (selection: SelectParam) => {
        const url = selection.key === '/' ? '' : selection.key;
        this.props.history.push(`${this.props.match.url}${url}`);
    };

    public render() {
        const { match } = this.props;
        const path = this.getPath(this.props);
        return (
            <div className="account">
                <div className="leftMenu">
                    <Menu
                        mode="inline"
                        theme="light"
                        className="menu"
                        selectedKeys={[path]}
                        onSelect={this.onSelect}
                    >
                        <Menu.Item key="/">
                            <FormattedMessage id="account_basic_setting" />
                        </Menu.Item>
                        <Menu.Item key="/notification">
                            <FormattedMessage id="account_notification_setting" />
                        </Menu.Item>
                    </Menu>
                </div>
                <div className="rightSide">
                    <Switch>
                        <Route
                            exact={true}
                            path={`${match.url}`}
                            component={BasicSetting}
                        />
                        <Route
                            exact={true}
                            path={`${match.url}/notification`}
                            component={NotificationSetting}
                        />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default connect()(Account);
