import React, {useState, useRef, useEffect} from 'react';
import {Input, Typography} from 'antd';
import {get} from 'lodash';
import * as numeral from 'numeral';
import { useSelector } from 'react-redux';

import './style.scss';
import { injectIntl } from 'react-intl';
const {Text} = Typography;
const DetailTotal = ({detail, checkPackage,intl}) => {
  const textPackage = 'order_details[0].package';
  const textMembership = 'order_details[0].membership';
  const discount = get(detail, 'order.promotion_value') || 0;
  const { rateIcbToVnd, rateIcbToUsd } = useSelector(state => state.dashboard);
  const renderPrice = () => {
    if (checkPackage) {
      const sale = get(detail, `${textPackage}.price_sale`);
      const price = get(detail, `${textPackage}.price`);
      return sale ? sale : price;
    } else {
      return get(detail, `order_details[0].price`);
    }
  };
  const renderStatus = (value) =>{
    switch (value) {
      case 0:
      case '0':
      case 'CANCEL':
        return <Text type='warning'>{intl.formatMessage({ id: 'order.detailTotal.cancel' })}</Text>;
      case 1:
      case '1':
      case 'COMPLETED':
      case 'SUCCESS':
    return <Text className='text-success-color'>{intl.formatMessage({ id: 'order.detailTotal.success' })}</Text>;
      case 2:
      case '2':
      case 'PENDING':
        return <Text>{intl.formatMessage({ id: 'order.detailTotal.pending' })}</Text>;
      default:
        break;
    }
  };
  return (
    <div className="wrapper-total">
      <div className="cart-total-container">
        <div className="header">{intl.formatMessage({ id: 'order.detailTotal.header' })}</div>
        <div className="content">
          <div className="promotion mt-20 mb-20">
            <h1>{intl.formatMessage({ id: 'order.detailTotal.status' })} {renderStatus(get(detail, 'order.status'))}</h1>
          </div>
          <div className="promotion  mb-20">
            <span className="control">
              <span>{intl.formatMessage({ id: 'order.detailTotal.discountCode' })}</span>
              <Input
                placeholder={intl.formatMessage({ id: 'order.detailTotal.discountCodePlace' })}
                size="large"
                //   onChange={(e) => setPromoCode(e.target.value)}
                value={get(detail, 'order.promotion_value')}
                disabled={true}
              />
            </span>
          </div>
          <div className="sub-total">
            <span>{intl.formatMessage({ id: 'order.detailTotal.value' })}</span>
            <span>{numeral(renderPrice()).format('0,0.00')} ICB</span>
          </div>
          <div className="discount">
            <span>{intl.formatMessage({ id: 'order.detailTotal.discount' })}</span>
            <span>- {numeral(discount).format('0,0.00')} ICB</span>
          </div>
          <hr></hr>

          <div className="total">
            <span>{intl.formatMessage({ id: 'order.detailTotal.total' })}</span>
            <span>{numeral(renderPrice() - discount).format('0,0.00')} ICB</span>
          </div>
          <hr></hr>

          <div className="discount">
            <span>{intl.formatMessage({ id: 'order.detailTotal.equivalent' })}</span>
            <span>
              ~{numeral((renderPrice() - discount) * rateIcbToVnd.rate).format('0,0.00')} VNĐ
            </span>
          </div>
          <div className="discount">
            <span></span>
            <span>
              ~{numeral((renderPrice() - discount) * rateIcbToUsd.rate).format('0,0.00')} USD
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default injectIntl(DetailTotal);
