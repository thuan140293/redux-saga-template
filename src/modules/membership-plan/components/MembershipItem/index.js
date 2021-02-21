import React from "react";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { get } from "lodash";
import { formatDate } from "helpers/CommonHelper";
import "./style.scss";
import { FormattedMessage } from "react-intl";

const MembershipItem = (props) => {
  const { detail, showModalAddItem } = props;
  const {
    hasPendingPlan,
    title,
    upgrade_ICB,
    renew_fee,
    upgrade_VND,
    card_front,
    id,
    generalPartner,
  } = detail;
  const { myMembershipData } = useSelector((state) => state.membershipPlan);
  const { cartData } = useSelector((state) => state.cart);
  const rateVND = 24000;
  const rateUSD = 1;
  const price = id === myMembershipData.id ? renew_fee : upgrade_ICB;
  const priceVND = price * rateVND;
  const onAddItemToCart = () => {
    showModalAddItem(detail);
  };

  const itemBefenit = [
    {
      type: `online_lib`,
      text: `Quản lý thông tin sức khỏe cá nhân`,
    },
    {
      type: `online_lib`,
      text: `Thư viện thông tin sức khỏe chính thống`,
    },
    {
      type: `health_storage`,
      text: `Lưu giữ bảo mật hồ sơ sức khỏe trọn đời`,
    },
    {
      type: `online_lib`,
      text: `Truy cập hồ sơ 03 tháng gần nhất`,
    },
    {
      type: `access_unlimited`,
      text: `Không giới hạn thời gian truy cập hồ sơ`,
    },
    {
      type: `premium_promotion`,
      text: `Ưu đãi dịch vụ từ các đối tác`,
    },
    {
      type: `insurance`,
      text: `Được bảo vệ bởi đối tác bảo hiểm`,
    },
    {
      type: `professor_talk`,
      text: `Hỏi đáp cùng bác sĩ & chuyên gia`,
    },
    {
      type: `medical_connect`,
      text: `Hỗ trợ thông tin dịch vụ y tế trong nước`,
    },
    {
      type: `schedule_alert`,
      text: `Nhắc lịch khám sức khỏe định kì`,
    },
    {
      type: `card_sos`,
      text: `Miễn phí phát hành thẻ cứng`,
    },
    {
      type: `medicare_global`,
      text: `Hỗ trợ thông tin dịch vụ y tế Quốc Tế`,
    },
    {
      type: `card_debit`,
      text: `Phát hành thẻ ghi nợ (Debit card)`,
    },
    {
      type: `card_credit`,
      text: `Phát hành thẻ tín dụng (Credit card)`,
    },
  ];
  const itemBefenitEn = [
    {
      type: `online_lib`,
      text: `Personal Medical Profile`,
    },
    {
      type: `online_lib`,
      text: `Online Library`,
    },
    {
      type: `health_storage`,
      text: `Online lifetime health record storage`,
    },
    {
      type: `online_lib`,
      text: `Last 3 Months Medical Profiles Accessibility`,
    },
    {
      type: `access_unlimited`,
      text: `Unlimited - Lifetime Profiles Accessibility`,
    },
    {
      type: `premium_promotion`,
      text: `Premium Promotion From ICB Partners`,
    },
    {
      type: `insurance`,
      text: ` Protected By Insurance Partner`,
    },
    {
      type: `professor_talk`,
      text: `Questions & Answers With Experts`,
    },
    {
      type: `medical_connect`,
      text: `Premium Medical Services Connection`,
    },
    {
      type: `schedule_alert`,
      text: `Reminder of Examination after (Uploading Medical Records)`,
    },
    {
      type: `card_sos`,
      text: `Issuance a iCB Medical Card contain your SOS information`,
    },
    {
      type: `medicare_global`,
      text: `Support Information international health services`,
    },
    {
      type: `card_debit`,
      text: `Issuance Debit card`,
    },
    {
      type: `card_credit`,
      text: `Issuance Credit card`,
    },
  ];
  const showIconPrefix = (hasActive) => {
    let result = <CheckOutlined className="check-color" />;
    if (hasActive.toString() === "0") {
      result = <CloseOutlined className="close-color" />;
    }
    return result;
  };
  const handleBefenit = () => {
    return itemBefenit.map((item, index) => (
      <p key={index}>
        {showIconPrefix(get(detail, `${get(item, "type")}`))}
        {get(item, "text")}
      </p>
    ));
  };
  return (
    <div className="membership-item-container">
      <div className="box">
        <div>
          {id === myMembershipData.id ? (
            <div className="membership-date-expired">
              <FormattedMessage id="membershipPlan.membershipItem.expiredAt"/>{" "}
              {formatDate(
                get(myMembershipData, "hisMem.expired_at"),
                "DD/MM/YYYY"
              )}
            </div>
          ) : null}
          <img
            className="mem-img"
            src={card_front ? card_front : ""}
            onError={(e) =>
              (e.target.src = require("assets/images/card-default.png"))
            }
            alt="card"
          />
        </div>
        <div className="info-card mt-20">
          <div className="title">
            <span>{title}</span>
          </div>
          <div className="current-icb">
            <span>{price} ICB</span>
          </div>
          <div className="mb-20">
            <span>
              {priceVND.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
              VNĐ
            </span>
          </div>
          <hr></hr>
          <div className="publisher">
            <span>
            <FormattedMessage id="membershipPlan.membershipItem.publisher"/> {get(generalPartner, "value", "iCareBase")}
            </span>
          </div>
          <hr></hr>
        </div>

        <div className="btn-signup mb-20">
          {id === myMembershipData.id && (
            <>
              {hasPendingPlan && (
                <div className="has-pending-plan">
                  <FormattedMessage id="membershipPlan.membershipItem.pendingPlan"/>
                </div>
              )}
              {!hasPendingPlan && (
                <Button size="large" type="primary" onClick={onAddItemToCart}>
                  <FormattedMessage id="membershipPlan.membershipItem.renew"/>
                </Button>
              )}
            </>
          )}
          {id !== myMembershipData.id && (
            <>
              {hasPendingPlan && (
                <div className="has-pending-plan">
                 <FormattedMessage id="membershipPlan.membershipItem.pendingPlan"/>
                </div>
              )}
              {!hasPendingPlan && (
                <Button size="large" type="primary" onClick={onAddItemToCart}>
                  <FormattedMessage id="membershipPlan.membershipItem.addNew"/>
                </Button>
              )}
            </>
          )}
        </div>
        <div className="befenit mb-20">{handleBefenit()}</div>
      </div>
    </div>
  );
};

export default MembershipItem;
