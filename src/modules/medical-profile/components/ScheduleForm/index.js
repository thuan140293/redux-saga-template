import React, { useEffect } from 'react';
import { DatePicker, Form, Select, Input, Button, Row, Col } from 'antd';
import { isEmpty } from 'lodash';
import * as moment from 'moment';
import { OPTION_MINUTES, OPTION_HOURS } from 'commons/constants';
import { injectIntl } from 'react-intl';

const dateFormat = "YYYY-MM-DD";
const ScheduleForm = ({
  onCloseModal,
  addSchedule,
  updateSchedule,
  detail,
  intl
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (isEmpty(detail)) {
      return;
    }
    form.setFieldsValue({
      date_schedule: moment(detail.schedule_at),
      hour: moment(detail.schedule_at).format('hh'),
      minute: moment(detail.schedule_at).format('mm'),
      content: detail.content,
      note: detail.note,
    });
  }, [detail]);

  const onSave = values => {
    const schedule_at = moment(values.date_schedule).format('YYYY-MM-DD') + ' ' + values.hour + ':' + values.minute;
    const payload = {
      schedule_at: schedule_at,
      content: values.content,
      note: values.note,
    };

    if (detail) {
      updateSchedule({ ...payload, id: detail.id });
      return;
    }
    addSchedule(payload);
  };

  return (
    <Form layout="vertical" onFinish={onSave} form={form}>
      <Form.Item
        label={intl.formatMessage({ id: 'medical-profile.scheduleForm.dateSchedule' })}
        name="date_schedule"
        className="form-item-custom"
        rules={[{ required: true, message: intl.formatMessage({ id: 'medical-profile.scheduleForm.message' }) }]}
      >
        <DatePicker
          size="large"
          className="w-100pc"
          size="large"
          format={dateFormat}
        />
      </Form.Item>

      <Row gutter={10}>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({ id: 'medical-profile.scheduleForm.time' })}
            name='hour'
            className="form-item-custom"
            rules={[{ required: true, message: intl.formatMessage({ id: 'medical-profile.scheduleForm.chooseHour' }) }]}
          >
            <Select allowClear size='large' placeholder={intl.formatMessage({ id: 'medical-profile.scheduleForm.dateSchedule' })}>
              {OPTION_HOURS.map(item => (
                <Select.Option item={item} value={item}>{item}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label='a'
            name='minute'
            className="form-item-custom-hidden"
            rules={[{ required: true, message: intl.formatMessage({ id: 'medical-profile.scheduleForm.chooseMinute' }) }]}
          >
            <Select allowClear size='large' placeholder={intl.formatMessage({ id: 'medical-profile.scheduleForm.dateSchedule' })}>
              {OPTION_MINUTES.map(item => (
                <Select.Option item={item} value={item}>{item}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

      </Row>


      <Form.Item
        name="content"
        label={intl.formatMessage({ id: 'medical-profile.scheduleForm.content' })}
        className="form-item-custom"
        rules={[{ required: true, message: intl.formatMessage({ id: 'medical-profile.scheduleForm.message' }) }]}
      >
        <Input.TextArea size="large" />
      </Form.Item>

      <Form.Item
        name="note"
        label={intl.formatMessage({ id: 'medical-profile.scheduleForm.note' })}
        className="form-item-custom"
        rules={[{ required: false, message: intl.formatMessage({ id: 'medical-profile.scheduleForm.message' }) }]}
      >
        <Input.TextArea size="large" />
      </Form.Item>

      <Form.Item className="action t-right">
        <Button size="middle" className="mr-10" onClick={() => onCloseModal()}>
          {intl.formatMessage({ id: 'medical-profile.scheduleForm.cancel' })}
        </Button>

        <Button size="middle" type="primary" htmlType="submit">
          {intl.formatMessage({ id: 'medical-profile.scheduleForm.save' })}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default injectIntl(ScheduleForm);
