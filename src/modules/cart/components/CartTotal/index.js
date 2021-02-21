import React, { useState, useRef, useEffect } from "react";
import { Input, Button } from "antd";
import { checkCoupon } from "modules/membership-plan/redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { get, sumBy } from "lodash";
import * as numeral from "numeral";
import "./styles.scss";
import { injectIntl } from "react-intl";
const CartTotal = ({ cartData, onSetPromotion, intl }) => {
  const dispatch = useDispatch();
  const [promoCode, setPromoCode] = useState("");
  const { rateIcbToVnd, rateIcbToUsd } = useSelector(state => state.dashboard);
  useEffect(() => {
    if (cartData) {
      setPromoCode(get(cartData, "[0].promotion_code"));
    }
  }, [cartData]);

  const checkValidCoupon = () => {
    if (!promoCode) {
      return;
    }
    const body = {
      promoCode,
      typeProduct:
        get(cartData, "[0].type") === "package"
          ? "product"
          : get(cartData, "[0].type"),
      productID: get(cartData, "[0].id"),
    };

    dispatch(
      checkCoupon(
        body,
        (data) => {
          onSetPromotion({ ...data, coupon: promoCode });
        },
        (error) => {
          onSetPromotion(null);
        }
      )
    );
  };

  const subTotal = sumBy(cartData, (item) => item.upgrade_ICB || item.price);
  const discount = get(cartData, "[0].promotion_value") || 0;
  return (
    <div className="cart-total-container">
      <div className="header">{intl.formatMessage({ id: 'cart.cartTotal.header' })}</div>
      <div className="content">
        <div className="promotion mb-20">
          <span className="control">
            <Input
              placeholder={intl.formatMessage({ id: 'cart.cartTotal.codeSales' })}
              size="large"
              onChange={(e) => setPromoCode(e.target.value)}
              value={promoCode}
            />
          </span>
          <Button size="large" type="primary" onClick={checkValidCoupon}>
            {intl.formatMessage({ id: 'cart.cartTotal.access' })}
          </Button>
        </div>
        <div className="sub-total">
          <span>{intl.formatMessage({ id: 'cart.cartTotal.value' })}</span>
          <span>{numeral(subTotal).format("0,0.00")} ICB</span>
        </div>
        <div className="discount">
          <span>{intl.formatMessage({ id: 'cart.cartTotal.discount' })}</span>
          <span>- {numeral(discount).format("0,0.00")} ICB</span>
        </div>
        <hr></hr>

        <div className="total">
          <span>{intl.formatMessage({ id: 'cart.cartTotal.total' })}</span>
          <span>{numeral(subTotal - discount).format("0,0.00")} ICB</span>
        </div>
        <hr></hr>

        <div className="discount">
          <span>{intl.formatMessage({ id: 'cart.cartTotal.discount2' })}</span>
          <span>
            ~{numeral((subTotal - discount) * rateIcbToVnd.rate).format("0,0.00")} VNĐ
          </span>
        </div>
        <div className="discount">
          <span></span>
          <span>
            ~{numeral((subTotal - discount) * rateIcbToUsd.rate).format("0,0.00")} USD
          </span>
        </div>
      </div>
    </div>
  );
};

export default injectIntl(CartTotal);
