import React from 'react';
import './style.scss';
import {AuditOutlined} from '@ant-design/icons';
import {get} from 'lodash';

import * as numeral from 'numeral';
import { FormattedMessage } from 'react-intl';
const DetailInfo = ({detail, setShowModalAddToCart, checkPackage}) => {
  const textPackage = 'order_details[0].package';
  const textMembership = 'order_details[0].membership';
  const renderPrice = () => {
    if (checkPackage) {
      const sale = get(detail, `${textPackage}.price_sale`);
      const price = get(detail, `${textPackage}.price`);
      return sale ? sale : price;
    } else {
      return get(detail, `order_details[0].price`);
    }
  };
  return (
    <div className="container-detail-order">
      <div className="cart-item">
        <div className="image">
          <img
            src={ (checkPackage ? get(detail, `${textPackage}.image`) : get(detail, `${textMembership}.thumbnail`)) || '' }
            alt="cart item"
            onError={(e) =>
              (e.target.src = require('assets/images/card-default.png'))
            }
          />
        </div>
        <div className="info">
          <div className="header">
            <span className="title">
              { checkPackage ? get(detail, `${textPackage}.title`) :get(detail, `${textMembership}.title`) }
            </span>
          </div>
          <div className="description">
            <span>
              { checkPackage ? get(detail, `${textPackage}.description`) :get(detail, `${textMembership}.description`) }
            </span>
            <span>
              {numeral(renderPrice()).format('0,0.00')}{' '}
              ICB
            </span>
          </div>
          <div className="beneficiary mt-10">
            <span className="text">
              {checkPackage && (
                <span onClick={() => setShowModalAddToCart(true)}>
                  <AuditOutlined /> <FormattedMessage id="order.detailInfo.info"/>
                </span>
              )}
            </span>
            <span className="icb">
              {numeral(renderPrice()).format('0,0.00')}{' '}
              ICB
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailInfo;
