import * as React from 'react';
import { Button } from 'antd';
import { FormattedMessage } from 'react-intl';
import './not-found.less';
import { RouteComponentProps } from 'react-router';

class NotFound extends React.Component<RouteComponentProps> {
    public onClickBackToHome = () => {
        this.props.history.push('/dashboard');
    };

    public render() {
        return (
            <div className="layout-top-layer not-found">
                <div className="container">
                    <h1>404</h1>
                    <div className="not-found-desc">
                        <FormattedMessage id="not_fount_desc" />
                    </div>
                    <div className="not-fount-actions">
                        <Button
                            type="primary"
                            size="large"
                            onClick={this.onClickBackToHome}
                        >
                            <FormattedMessage id="back_to_home" />
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default NotFound;
