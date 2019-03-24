import * as React from 'react';
import { connect } from 'react-redux';
import './basic-setting.less';
import { Avatar, Button, Form, Input, Spin, Upload, Icon, message } from 'antd';
import { ChangeEvent } from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { FormComponentProps } from 'antd/lib/form';
import { Dispatch } from 'redux';
import { AccountActions } from '../../stores/account/actions';
import { ApplicationState } from '../../stores';
import {
    getAccountEmail,
    getAccountPhone,
} from '../../stores/account/selectors';

import avatar from '../../assets/images/avatar_0.svg';
import { RcFile, UploadChangeParam } from 'antd/lib/upload/interface';

interface Props extends FormComponentProps, InjectedIntlProps {
    getInfo: () => void;
    updateInfo: (email: string, phone: string) => void;
    email: string;
    phone: string;
    bIsUpdateInfoRequesting: boolean;
    bIsGetInfoRequesting: boolean;
}

interface States {
    bHasUpdate: boolean;
    bUploading: boolean;
    avatarData: string | null;
}

class BasicSetting extends React.Component<Props, States> {
    constructor(props: Props) {
        super(props);
        this.state = {
            bHasUpdate: false,
            bUploading: false,
            avatarData: null,
        };
    }

    public onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value;
        const phone: string = this.props.form.getFieldValue('phone');
        this.setState({
            bHasUpdate:
                this.props.email !== email || this.props.phone !== phone,
        });
    };

    public onChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
        const phone = e.target.value;
        const email: string = this.props.form.getFieldValue('email');
        this.setState({
            bHasUpdate:
                this.props.email !== email || this.props.phone !== phone,
        });
    };

    public onSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.updateInfo(values.email, values.phone);
            }
        });
    };

    public beforeUpload = (file: RcFile): boolean | Promise<any> => {
        const { intl } = this.props;
        switch (file.type) {
            case 'image/jpeg':
                break;
            case 'image/jpg':
                break;
            case 'image/png':
                break;
            case 'image/svg+xml':
                break;
            default:
                message.error(
                    `${intl.formatMessage(
                        { id: 'avatar_upload_invalid_format' },
                        { format: file.type }
                    )}`
                );
                return false;
        }
        const isTooLarge = file.size / 1024 / 1024 > 2;
        if (isTooLarge) {
            message.error(
                `${intl.formatMessage({ id: 'avatar_upload_too_large' })}`
            );
            return false;
        }
        return true;
    };

    public handleUploadChange = (info: UploadChangeParam) => {
        if (info.file.status === 'uploading') {
            this.setState({ bUploading: true });
            return;
        }
        if (
            info.file.status === 'done' &&
            info.file.originFileObj !== undefined
        ) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                if (!(reader.result instanceof ArrayBuffer)) {
                    this.setState({
                        bUploading: false,
                        avatarData: reader.result,
                    });
                }
            });
            reader.readAsDataURL(info.file.originFileObj);
        }
    };

    public componentDidMount(): void {
        this.props.getInfo();
    }

    public render() {
        if (this.props.bIsGetInfoRequesting) {
            return (
                <div className="loading-page">
                    <Spin size="large" />
                </div>
            );
        } else {
            const { intl, email, phone } = this.props;
            const { getFieldDecorator } = this.props.form;
            const avatarSrc =
                this.state.avatarData !== null ? this.state.avatarData : avatar;
            return (
                <div className="basic-setting-container">
                    <div className="leftPart">
                        <Form>
                            <Form.Item label="Email">
                                {getFieldDecorator('email', {
                                    initialValue: email,
                                    rules: [
                                        {
                                            required: true,
                                            message: intl.formatMessage({
                                                id: 'email_input_error_empty',
                                            }),
                                        },
                                        {
                                            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            message: intl.formatMessage({
                                                id: 'email_input_error_invalid',
                                            }),
                                        },
                                    ],
                                })(<Input onChange={this.onChangeEmail} />)}
                            </Form.Item>
                            <Form.Item
                                label={intl.formatMessage({
                                    id: 'phone-number',
                                })}
                            >
                                {getFieldDecorator('phone', {
                                    initialValue: phone,
                                    rules: [
                                        {
                                            required: true,
                                            message: intl.formatMessage({
                                                id: 'phone_input_error_empty',
                                            }),
                                        },
                                        {
                                            pattern: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                                            message: intl.formatMessage({
                                                id: 'phone_input_error_invalid',
                                            }),
                                        },
                                    ],
                                })(<Input onChange={this.onChangePhone} />)}
                            </Form.Item>
                            <Button
                                onClick={this.onSubmit}
                                htmlType="button"
                                type="primary"
                                disabled={!this.state.bHasUpdate}
                                loading={this.props.bIsUpdateInfoRequesting}
                            >
                                <FormattedMessage id="update-information" />
                            </Button>
                        </Form>
                    </div>
                    <div className="rightPart">
                        <div className="avatarTitle">
                            <FormattedMessage id="avatar" />
                        </div>
                        <div className="avatarIcon">
                            <Avatar size={128} src={avatarSrc} />
                        </div>
                        <Upload
                            name="logo"
                            beforeUpload={this.beforeUpload}
                            action="//jsonplaceholder.typicode.com/posts/"
                            showUploadList={false}
                            onChange={this.handleUploadChange}
                        >
                            <Button loading={this.state.bUploading}>
                                <Icon type="upload" />{' '}
                                <FormattedMessage id="avatar_upload" />
                            </Button>
                        </Upload>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = ({ account }: ApplicationState) => ({
    email: getAccountEmail(account),
    phone: getAccountPhone(account),
    bIsUpdateInfoRequesting: account.isUpdateInfoRequesting,
    bIsGetInfoRequesting: account.isGetInfoRequesting,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getInfo: () => dispatch(AccountActions.getAccountInfo()),
    updateInfo: (email: string, phone: string) =>
        dispatch(AccountActions.updateInfo(email, phone)),
});

const WrappedForm = Form.create({
    name: 'basic_setting',
})(BasicSetting);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(WrappedForm));
