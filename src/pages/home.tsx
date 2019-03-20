import * as React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Button, Pagination } from 'antd';
import { Dispatch } from 'redux';
import { ApplicationState } from '../stores';
import { connect } from 'react-redux';
import { LanguageActions } from '../stores/language/actions';

interface Props {
    readonly language: string;
    changeLanguage: (language: string) => void;
}
class Home extends React.Component<Props> {
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

    public render() {
        return (
            <div>
                home page
                <br />
                <FormattedMessage id="App.test.message0" />
                <br />
                <Pagination
                    defaultCurrent={6}
                    total={50}
                    showSizeChanger={true}
                />
                <Link to="/login">to login</Link>
                <Button htmlType="button" onClick={this.switchLan}>
                    change
                </Button>
            </div>
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