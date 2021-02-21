import React from "react";
import { Drawer } from "antd";
import "./styles.scss";

const ItemDetail = ({
  isShow = false,
  toggleModal = () => {},
  title = "Edit data",
  children,
}) => {
  return (
    <>
      <div className="item-detail">
        <Drawer
          placement="right"
          visible={isShow}
          className="mode-drawer-custom"
          onClose={() => {
            toggleModal(false);
          }}
          title={title}
          bodyStyle={{ padding: 20 }}
        >
          {children}
        </Drawer>
      </div>
    </>
  );
};

export default ItemDetail;
