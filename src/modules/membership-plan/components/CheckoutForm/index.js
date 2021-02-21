import React, { useState } from 'react';
import { Row, Col, Radio, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { get } from 'lodash';
import { checkCoupon } from 'modules/membership-plan/redux/actions';
import { injectIntl } from 'react-intl';
const radioStyle = {
  display: 'flex',
};
const radioStyleBlock = {
  display: 'block'
};

const CheckoutForm = ({
  membershipSelected,
  onChangeMembership,
  intl
}) => {
  const dispatch = useDispatch();
  const { paymentsService } = useSelector(state => state.membershipPlan);

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [promoCode, setPromoCode] = useState('');
  const [promotion, setPromotion] = useState({});

  const handleChangePayment = e => {
    setPaymentMethod(e.target.value);
  }

  const checkValidCoupon = () => {
    if (!promoCode) {
      return;
    }
    const body = {
      promoCode,
      typeProduct: "membership",
      productID: get(membershipSelected, "id")
    };

    dispatch(
      checkCoupon(body,
        data => {
          setPromotion({ ...data, coupon: promoCode });
        },
        error => {
          setPromotion(error);
        }
      )
    )
  }

  const handleSubmit = () => {
    const payload = {
      membershipId: membershipSelected.id,
      paymentType: paymentMethod,
      promoCode: get(promotion, "promo_status") ? get(promotion, "coupon") : ""
    };
    onChangeMembership(payload);
  }

  return (
    <>
      <Row gutter={10}>
        <Col span={12}>
          {paymentMethod !== 'icb' && (
            <div>{get(membershipSelected, 'upgrade_VND')} đ</div>
          )}
          {paymentMethod === 'icb' && (
            <div>{get(membershipSelected, 'upgrade_ICB')} ICB</div>
          )}
          <div>{intl.formatMessage({ id: 'membershipPlan.checkoutForm.needToPay' })}</div>
        </Col>
        <Col span={12}>
          <div className='mb-5'>{intl.formatMessage({ id: 'membershipPlan.checkoutForm.method' })}</div>

          <Radio.Group
            onChange={handleChangePayment}
            value={paymentMethod}
          >
            {paymentsService.length &&
              paymentsService.map(item => (
                <Radio style={radioStyle} key={item.id} value={item.value}>
                  <div>{item.description}</div>
                  <div>
                    {item.content.map(item => (
                      <div key={item}>
                        {item}
                      </div>
                    ))}
                  </div>
                </Radio>
              ))
            }
            {!paymentsService.length && (
              <>
                <Radio style={radioStyleBlock} value="cod" className='mb-10'>
                {intl.formatMessage({ id: 'membershipPlan.checkoutForm.cod' })}
              </Radio>
                <Radio style={radioStyleBlock} value="banktransfer" className='mb-10'>
                {intl.formatMessage({ id: 'membershipPlan.checkoutForm.banktransfer' })}
              </Radio>
                <Radio style={radioStyleBlock} value="alepay" className='mb-10'>
                {intl.formatMessage({ id: 'membershipPlan.checkoutForm.alepay' })}
              </Radio>
                <Radio style={radioStyleBlock} value="icb">
                  ICB
              </Radio>
              </>
            )}
          </Radio.Group>
        </Col>
      </Row>
      <Row gutter={16} className="mt-10">
        <Col span={17}>
          <Input
            size='large'
            onChange={e => setPromoCode(e.target.value)}
            value={promoCode}
            placeholder={intl.formatMessage({ id: 'membershipPlan.checkoutForm.importCoupons' })}
          />
        </Col>
        <Col span={7}>
          <Button type="primary" onClick={checkValidCoupon}>{intl.formatMessage({ id: 'membershipPlan.checkoutForm.checkValidCoupon' })}</Button>
        </Col>
      </Row>

      <div className='t-right'>
        <Button
          onClick={handleSubmit}
          type="primary"
          className="gx-mb-0"
        >
          {intl.formatMessage({ id: 'membershipPlan.checkoutForm.submit' })}
        </Button>
      </div>
    </>

  )
}

export default injectIntl(CheckoutForm);
