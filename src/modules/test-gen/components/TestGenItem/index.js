import React from "react";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setCartData } from "modules/cart/redux/actions";
import { toast } from "react-toastify";
import "./style.scss";
import { ROUTE } from "commons/constants";
import { injectIntl } from "react-intl";

const TestGenItem = ({ detail, handleReadMore, history, intl }) => {
  const dispatch = useDispatch();
  const { cartData } = useSelector((state) => state.cart);
  const { title, price, imageUrl, description, id, currency } = detail;

  const onAddItemToCart = () => {
    const payload = [{ ...detail, type: "package" }];
    dispatch(
      setCartData({
        cartData: payload,
        cartStep: 1,
      })
    );
    history.push(ROUTE.CART);
    toast.info(
      cartData.length
        ? intl.formatMessage({ id: 'testGen.testGenItem.onAddItemToCart' })
        : intl.formatMessage({ id: 'testGen.testGenItem.onChangeItemToCart' })
    );
  };
  return (
    <div className="gen-container">
      <div className="box-gen">
        <img
          className="gen-img"
          src={imageUrl ? imageUrl : ""}
          onError={(e) =>
            (e.target.src = require("assets/images/card-default.png"))
          }
          alt="card"
        />
        <div className="gen-info">
          <h1>{title}</h1>
          <div className="info-moneny">
            {price} {currency}
          </div>
          <div className="info-description">
            <p>{description}</p>
          </div>
          <a onClick={() => handleReadMore(id)}>
            {intl.formatMessage({ id: 'testGen.testGenItem.readMore' })}
          </a>
        </div>
        <div className="gen-action">
          <Button
            size="middle"
            className="add-to-cart"
            type="primary"
            onClick={onAddItemToCart}
          >
            {intl.formatMessage({ id: 'testGen.testGenItem.addItemToCart' })}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default injectIntl(TestGenItem);
