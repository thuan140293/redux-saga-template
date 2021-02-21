import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Steps, Card, Row, Col, Button, Empty, Modal } from "antd";
import {
  CloseOutlined,
  AuditOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { get, sumBy, isEmpty } from "lodash";
import { toast } from "react-toastify";
import {
  getWallet,
  walletTransDepositOnline,
} from "modules/dashboard/redux/actions";
import { setCartStep, paymentOrder, setCartData } from "../redux/actions";
import { getListCity, getGeneralKeyList } from "modules/test-gen/redux/actions";
import { BeneficiaryInfo, CartTotal } from "../components";
import {
  DepositModal,
  PaymentOnlineModal,
  PaymentBankModal,
  PaymentTransferModal,
} from "modules/dashboard/components";
import { TYPE_PAYMENT } from "modules/dashboard/constants";
import * as numeral from "numeral";
import "./styles.scss";
import { ROUTE } from "commons/constants";
import { injectIntl } from "react-intl";

const { Step } = Steps;
const CartPage = ({ history, intl }) => {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  const [showModalAddToCart, setShowModalAddToCart] = useState(false);
  const [dataModalPayment, setDataModelPayment] = useState({
    type: "",
    isShow: false,
  });
  // only for type package
  const [orderDetail, setOrderDetail] = useState(null);

  const { userInfo } = useSelector((state) => state.auth);
  const { cartData, cartStep } = useSelector((state) => state.cart);
  const { walletData } = useSelector((state) => state.dashboard);
  useEffect(() => {
    if (isEmpty(walletData)) {
      dispatch(getWallet());
    }
    dispatch(getGeneralKeyList({ type: "relationship" }, "listRelation"));
  }, []);

  useEffect(() => {
    return () => {
      if (!cartData.length) {
        dispatch(
          setCartData({
            cartData: [],
            cartStep: 1,
          })
        );
      }
    };
  }, []);

  useEffect(() => {
    setCurrentStep(cartStep - 1);
  }, [cartStep]);

  const finishCheckout = (paymentType) => {
    const cartItem = cartData[0];
    const payload = {
      product_id: cartItem.id,
      promotion_code: "",
      quantity: 1,
      type_buy: cartItem.type,
      membership_plan_type: "change",
      currency_type: "ICB",
      note: "",
      payment_type: paymentType,
      order_details: cartItem.order_details,
    };

    dispatch(
      paymentOrder(payload, () => {
        if (cartItem.type === "membership") {
          history.push(ROUTE.HEALTH_PROFILE);
        }
      })
    );
  };

  const handleShowModalPayment = (type) => {
    if (type === TYPE_PAYMENT.ONLINE) {
      setDataModelPayment({
        type,
        isShow: true,
      });
      return;
    }
    if (type === TYPE_PAYMENT.BANK) {
      finishCheckout("TRANSFER");
      return;
    }
    finishCheckout("COD");
  };
  let amountToDeposit = 0;
  const checkShowStep2 = () => {
    const totalPrice = sumBy(
      cartData,
      (item) => item.upgrade_ICB || item.price || 0
    );
    const discount = get(cartData, "[0].promotion_value") || 0;
    amountToDeposit =
      (get(walletData, "amount") || 0) - (totalPrice + discount);
    if (amountToDeposit >= 0) {
      return (
        <>
          <div className="cart-step-2 mt-20">
            <div className="info">
              <div className="title">{intl.formatMessage({ id: 'cart.pages.useICB' })}</div>
              <div>{intl.formatMessage({ id: 'cart.pages.cashPaymentICB' })}</div>
            </div>
            <div className="value">
              -{numeral(totalPrice - discount).format("0,0.00")} ICB
            </div>
          </div>
          <div className="mt-30 t-center">
            <Button className='mr-10' size='large' onClick={() => {
              dispatch(
                setCartStep(currentStep)
              );
            }}>
              {intl.formatMessage({ id: 'cart.pages.back' })}
            </Button>
            <Button
              size="large"
              type="primary"
              onClick={() => finishCheckout("ICB")}
            >
              {intl.formatMessage({ id: 'cart.pages.finish' })}
            </Button>
          </div>
        </>
      );
    }

    return (
      <>
        <div className="cart-step-2 mt-20">
          <div className="info">
            <div className="title">{intl.formatMessage({ id: 'cart.pages.infoTitle1' })} <span style={{ color: "blue" }}>{amountToDeposit * -1} ICB</span></div>
            <div>{intl.formatMessage({ id: 'cart.pages.infoTitle2' })}</div>
          </div>
        </div>
        <div className="mt-30">
          <DepositModal
            showHeader={false}
            showModalPayment={handleShowModalPayment}
          />

        </div>

        <div className='t-center mt-20'>
          <Button className='mr-10' size='large' onClick={() => {
            dispatch(
              setCartStep(currentStep)
            );
          }}>
            {intl.formatMessage({ id: 'cart.pages.back' })}
          </Button>
        </div>
      </>
    );
  };

  const userInfoMemo = useMemo(() => {
    return {
      firstName: get(userInfo, "first_name"),
      lastName: get(userInfo, "last_name"),
      gender: get(userInfo, "gender"),
      phone_number: get(userInfo, "phone_number"),
      address: get(userInfo, "address"),
      email: get(userInfo, "email"),
      country: get(userInfo, "country"),
      province: get(userInfo, "province"),
    };
  }, [userInfo]);

  const onGetListCity = (payload) => {
    dispatch(getListCity(payload));
  };

  const handleSetPromotion = (promotionData) => {
    let cartItem = cartData[0];
    cartItem = {
      ...cartItem,
      promotion_code: promotionData ? promotionData.coupon : "",
      promotion_value: promotionData ? promotionData.promo_value : "",
    };
    dispatch(
      setCartData({
        cartData: [cartItem],
        cartStep: currentStep + 1,
      })
    );
  };

  const goCheckout = () => {
    const cartItem = cartData[0];
    if (cartItem.type === "package") {
      if (!orderDetail) {
        toast.warn(intl.formatMessage({ id: 'cart.pages.orderDetailWarn' }));
        return;
      }
      dispatch(
        setCartData({
          cartData: [{ ...cartItem, order_details: orderDetail }],
          cartStep: 2,
        })
      );
      return;
    }
    dispatch(setCartStep(2));
  };

  const onCloseModalPayment = () => {
    setDataModelPayment({
      type: "",
      isShow: false,
    });
  };

  const onWalletTransDepositOnline = (payload) => {
    dispatch(
      walletTransDepositOnline(payload, (data) => {
        onCloseModalPayment();
        window.location.replace(data.alepayUrl);
      })
    );
  };

  const removeCartItem = () => {
    dispatch(
      setCartData({
        cartData: [],
        cartStep: 1,
      })
    );
    toast.info(intl.formatMessage({ id: 'cart.pages.deleteSuccess' }));
  };

  console.log('currentStep-----------------:', currentStep);
  return (
    <>
      <Modal
        visible={dataModalPayment.isShow}
        onCancel={onCloseModalPayment}
        footer={null}
        width={700}
      >
        {dataModalPayment.type === TYPE_PAYMENT.ONLINE && (
          <PaymentOnlineModal
            onWalletTransDepositOnline={onWalletTransDepositOnline}
            onCloseModal={onCloseModalPayment}
          />
        )}
      </Modal>

      <Modal
        visible={showModalAddToCart}
        onCancel={() => setShowModalAddToCart(false)}
        title={intl.formatMessage({ id: 'cart.pages.beneficiaryInfo' })}
        footer={null}
        width={600}
      >
        {showModalAddToCart && (
          <BeneficiaryInfo
            onCloseModal={() => setShowModalAddToCart(false)}
            onGetListCity={onGetListCity}
            userInfo={orderDetail ? orderDetail : userInfoMemo}
            onSubmit={(data) => {
              setOrderDetail(data);
              setShowModalAddToCart(false);
            }}
          />
        )}
      </Modal>

      {cartData.length === 0 && currentStep === 2 && (
        <Card className="cart-container">
          <Steps current={2}>
            <Step title={intl.formatMessage({ id: 'cart.pages.cart' })} />
            <Step title={intl.formatMessage({ id: 'cart.pages.mathMethod' })} />
            <Step title={intl.formatMessage({ id: 'cart.pages.completed' })} />
          </Steps>
          <div className="payment-success t-center">
            <CheckCircleOutlined style={{ fontSize: "60px", color: "green" }} />
            <h2 className="mt-20">{intl.formatMessage({ id: 'cart.pages.paymentSuccess' })}</h2>
            <Link to="/order">{intl.formatMessage({ id: 'cart.pages.manageOrder' })} {">"}</Link>
          </div>
        </Card>
      )}

      {cartData.length === 0 && currentStep === 0 && (
        <Card>
          <Empty description={intl.formatMessage({ id: 'cart.pages.cartEmpty' })} />
        </Card>
      )}
      {cartData.length > 0 && (
        <Card className="cart-container">
          <div className="mt-50">
            {currentStep === 1 && (
              <Row gutter={[16, 16]}>
                <Col xl={16} lg={16} md={24} xs={24}>
                  <Steps current={currentStep}>
                    <Step title={intl.formatMessage({ id: 'cart.pages.cart' })} />
                    <Step title={intl.formatMessage({ id: 'cart.pages.mathMethod' })} />
                    <Step title={intl.formatMessage({ id: 'cart.pages.completed' })} />
                  </Steps>
                  {checkShowStep2()}
                </Col>
                <Col xl={8} lg={8} md={24} xs={24}>
                  <CartTotal
                    cartData={cartData}
                    onSetPromotion={handleSetPromotion}
                  />
                </Col>
              </Row>
            )}
            {currentStep === 0 && (
              <>
                <Row gutter={[16, 16]}>
                  <Col xl={16} lg={16} md={24} xs={24}>
                    {cartData.map((item) => (
                      <div key={item.id} className="cart-item">
                        <div className="image">
                          {get(item, "imageUrl") && (
                            <img src={get(item, "imageUrl")} alt="card" />
                          )}
                          {!get(item, "imageUrl") && (
                            <img
                              src={require("assets/images/card-default.png")}
                              alt="card"
                            />
                          )}
                        </div>
                        <div className="info">
                          <div className="header">
                            <span className="title">{item.title}</span>
                            <CloseOutlined
                              className="icon-delete"
                              onClick={removeCartItem}
                            />
                          </div>
                          <div className="description">
                            <span>{item.description}</span>
                            <span>
                              {numeral(item.upgrade_ICB || item.price).format(
                                "0,0.00"
                              )}{" "}
                              ICB
                            </span>
                          </div>
                          <div className="beneficiary mt-10">
                            <span className="text">
                              {item.type === "package" && (
                                <span
                                  onClick={() => setShowModalAddToCart(true)}
                                >
                                  <AuditOutlined /> {intl.formatMessage({ id: 'cart.pages.beneficiaryInfo' })}
                                </span>
                              )}
                            </span>
                            <span className="icb">
                              {numeral(item.upgrade_ICB || item.price).format(
                                "0,0.00"
                              )}{" "}
                              ICB
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Col>
                  <Col xl={8} lg={8} md={24} xs={24}>
                    <CartTotal
                      cartData={cartData}
                      onSetPromotion={handleSetPromotion}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col span={16} className="t-center mt-10">
                    <Button onClick={goCheckout} size="large" type="primary">
                      {intl.formatMessage({ id: 'cart.pages.pay' })}
                    </Button>
                  </Col>
                </Row>
              </>
            )}
          </div>
        </Card>
      )}
    </>
  );
};

export default injectIntl(CartPage);
