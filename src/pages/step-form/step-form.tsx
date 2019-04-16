import * as React from 'react';
import './step-form.less';
import { Button, Col, DatePicker, Form, Icon, Input, Row, Steps } from 'antd';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ApplicationState } from '../../stores';
import './step-form.less';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { FormComponentProps } from 'antd/lib/form';
import { TodoActions } from '../../stores/todo/action';
import { RangePickerPresetRange } from 'antd/lib/date-picker/interface';
import * as moment from 'moment';

const Step = Steps.Step;

interface Props extends FormComponentProps, InjectedIntlProps {
    current_step: number;
    submitTitle: (title: string) => void;
    submitDate: (start: moment.Moment, end: moment.Moment) => void;
    cancel: () => void;
    submit: () => void;
    start: moment.Moment | undefined;
    end: moment.Moment | undefined;
    title: string;
}

interface States {
    start: moment.Moment | undefined;
    end: moment.Moment | undefined;
    bNext: boolean;
}

class StepForm extends React.Component<Props, States> {
    public constructor(props: Props) {
        super(props);
        this.state = {
            start: undefined,
            end: undefined,
            bNext: false,
        };
    }

    public submitTitle = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(`submit title: ${values.title}`);
                this.props.submitTitle(values.title);
            }
        });
    };

    public submitDate = () => {
        const { start, end } = this.state;
        if (start !== undefined && end !== undefined) {
            this.props.submitDate(start, end);
        }
    };

    public cancel = () => {
        this.props.cancel();
    };

    public onRangeOk = (dates: RangePickerPresetRange) => {
        if (dates.length === 2) {
            const start = dates[0];
            const end = dates[1];
            if (start !== undefined && end !== undefined) {
                this.setState({ start: start, end: end, bNext: true });
            }
        }
    };

    public renderConfirm() {
        const { title, start, end } = this.props;
        const titleStr = title ? title : '';
        const starTime = start ? start.toString() : '';
        const endTime = end ? end.toString() : '';
        return (
            <div>
                <Row>
                    <Col span={24}>
                        <span>{titleStr}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={10}>
                        <FormattedMessage id="todo_start" />:
                    </Col>
                    <Col span={12} offset={2}>
                        <span>{starTime}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={10}>
                        <FormattedMessage id="todo_end" />:
                    </Col>
                    <Col span={12} offset={2}>
                        <span>{endTime}</span>
                    </Col>
                </Row>
                <Button
                    htmlType="submit"
                    type="primary"
                    onClick={this.cancel}
                    className="submit-button"
                >
                    <FormattedMessage id="confirm" />
                </Button>
            </div>
        );
    }

    public renderSelectDate() {
        const { bNext } = this.state;
        return (
            <Form className="step-form">
                <Form.Item>
                    <DatePicker.RangePicker
                        className="date-picker"
                        showTime={true}
                        onOk={this.onRangeOk}
                    />
                </Form.Item>
                <Form.Item>
                    <Row>
                        <Col span={10}>
                            <Button
                                htmlType="submit"
                                type="default"
                                onClick={this.cancel}
                                className="submit-button"
                            >
                                <FormattedMessage id="cancel" />
                            </Button>
                        </Col>
                        <Col span={10} offset={2}>
                            <Button
                                htmlType="submit"
                                type="primary"
                                onClick={this.submitDate}
                                disabled={!bNext}
                                className="submit-button"
                            >
                                <FormattedMessage id="todo_submit_title" />
                            </Button>
                        </Col>
                    </Row>
                </Form.Item>
            </Form>
        );
    }

    public renderStart() {
        const { getFieldDecorator } = this.props.form;
        const { intl } = this.props;
        return (
            <Form className="step-form">
                <Form.Item>
                    {getFieldDecorator('title', {
                        rules: [
                            {
                                required: true,
                                message: intl.formatMessage({
                                    id: 'todo_tile_empty',
                                }),
                            },
                        ],
                    })(
                        <Input
                            placeholder={intl.formatMessage({
                                id: 'todo_title',
                            })}
                            prefix={
                                <Icon
                                    type="title"
                                    style={{
                                        color: 'rgba(0,0,0,.25)',
                                    }}
                                />
                            }
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button
                        htmlType="submit"
                        type="primary"
                        onClick={this.submitTitle}
                        className="submit-button"
                    >
                        <FormattedMessage id="todo_submit_title" />
                    </Button>
                </Form.Item>
            </Form>
        );
    }

    public render() {
        const { current_step, intl } = this.props;
        return (
            <div className="layout-top-layer">
                <div className="top">
                    <Steps current={current_step}>
                        <Step
                            title={intl.formatMessage({
                                id: 'todo_title',
                            })}
                        />
                        <Step
                            title={intl.formatMessage({
                                id: 'todo_time',
                            })}
                        />
                        <Step
                            title={intl.formatMessage({
                                id: 'todo_confirm',
                            })}
                        />
                    </Steps>
                </div>
                <div className="container">
                    {current_step === 0 && this.renderStart()}
                    {current_step === 1 && this.renderSelectDate()}
                    {current_step === 2 && this.renderConfirm()}
                </div>
            </div>
        );
    }
}

const WrappedStepForm = Form.create({ name: 'login_form' })(StepForm);

const mapDispatchToProps = (dispatch: Dispatch) => ({
    submitTitle: (title: string) => dispatch(TodoActions.start(title)),
    submitDate: (start: moment.Moment, end: moment.Moment) =>
        dispatch(TodoActions.selectDate(start, end)),
    cancel: () => dispatch(TodoActions.cancel()),
    submit: () => dispatch(TodoActions.submit()),
});

const mapStateToProps = ({ todo }: ApplicationState) => ({
    current_step: todo.step,
    title: todo.title,
    start: todo.start,
    end: todo.end,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(WrappedStepForm));
