import React, { useState, useEffect } from 'react';
import { Input, Form, Row, Col, Button, Typography, InputNumber } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { exchangeCalRate, exchangeCalRateSuccess } from 'modules/dashboard/redux/actions';
import { debounced } from 'helpers/CommonHelper';
import { isEmpty } from 'lodash';
import './styles.scss';
import { FormattedMessage } from 'react-intl';

const { Text } = Typography;

const PaymentOnlineModal = ({
  onCloseModal,
  onWalletTransDepositOnline
}) => {
  const dispatch = useDispatch();

  const [icbValue, setIcbValue] = useState('');
  const [vndValue, setVndValue] = useState('');
  const { exchangeData } = useSelector(state => state.dashboard);

  useEffect(() => {
    if (isEmpty(exchangeData)) {
      return;
    }
    if (exchangeData.from === 'ICB') {
      setVndValue(exchangeData.value);
      return;
    }
    setIcbValue(exchangeData.value);
  }, [exchangeData]);

  useEffect(() => {
    return () => {
      dispatch(exchangeCalRateSuccess({}));
    };
  }, [dispatch])

  const exchangeIcbToVnd = value => {
    setIcbValue(value);
    debounced(() => {
      dispatch(
        exchangeCalRate({
          from_currency: 'ICB',
          to_currency: 'VND',
          amount: value,
          type: 'DEPOSIT'
        })
      );
    });
  }

  const exchangeVndToIcb = value => {
    setVndValue(value)
    debounced(() => {
      dispatch(
        exchangeCalRate({
          from_currency: 'VND',
          to_currency: 'ICB',
          amount: value,
          type: 'DEPOSIT'
        })
      );
    });
  }

  const onFinish = values => {
    if (!icbValue || !vndValue) {
      return;
    }
    onWalletTransDepositOnline({ amount: icbValue, note: values.note });
  }

  return (
    <div className='online-modal-container'>
      <div className='title'><FormattedMessage id="dashboard.paymentOnlineModal.title"/></div>
      <div className='sub-title'><FormattedMessage id="dashboard.paymentOnlineModal.subTitle"/></div>

      <div className='content'>
        <Form layout="vertical" onFinish={onFinish}>
          <Row className='mb-20'>
            <Col span={12}>
              <div className='label-custom'>
                <label className='label-require'><FormattedMessage id="dashboard.paymentOnlineModal.labelRequire"/></label>
              </div>

              <div className='control'>
                <div className='control-left'>
                  <InputNumber
                    value={icbValue}
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    size="large"
                    onChange={exchangeIcbToVnd}
                  />
                </div>
                <div className="unit">
                  <Input
                    size='large'
                    disabled
                    suffix="ICB"
                  />
                </div>
              </div>

            </Col>
            <Col span={12}>
              <div className='label-custom'>
                <label className='form-item-hide-custom'>a</label>
              </div>

              <div className='control'>
                <div className='control-left'>
                  <InputNumber
                    value={vndValue}
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    size="large"
                    onChange={exchangeVndToIcb}
                  />
                </div>
                <div className="unit">
                  <Input
                    size='large'
                    disabled
                    suffix="VND"
                  />
                </div>
              </div>
            </Col>
            {!icbValue && <Text type="danger"><FormattedMessage id="dashboard.paymentOnlineModal.labelRequire"/></Text>}
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item
                label={<FormattedMessage id="dashboard.paymentOnlineModal.transactionNotes"/>}
                name='note'
                rules={[{ required: true, message: <FormattedMessage id="dashboard.paymentOnlineModal.noteMessage"/> }]}
              >
                <Input.TextArea size="large"></Input.TextArea>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col className='t-right' span={24}>
              <Button
                className='mr-10'
                onClick={onCloseModal}
                size="large"
              ><FormattedMessage id="dashboard.paymentOnlineModal.cancel"/></Button>
              <Button
                htmlType="submit"
                size="large"
                type="primary"
              ><FormattedMessage id="dashboard.paymentOnlineModal.payNow"/></Button>
            </Col>
          </Row>
        </Form>

      </div>
    </div>
  )
}

export default PaymentOnlineModal;
