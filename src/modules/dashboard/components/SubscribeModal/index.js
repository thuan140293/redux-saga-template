import React from "react";
import { Button } from "antd";
import { FormattedMessage } from "react-intl";

import "./styles.scss";


const SubscribeModal = ({ onClose = () => { }, onConfirmSubscribe = () => { } }) => {
    return (
        <div className="subscribe-modal-container">
            {/* <Button
                key="cancel"
                onClick={() => { onClose() }}
            >
                <FormattedMessage id="dashboard.referals.subscribe.modal.button.cancel" />
            </Button> */}
            <Button
                key="ok"
                onClick={() => { onConfirmSubscribe() }}
            >
                <FormattedMessage id="dashboard.referals.subscribe.modal.button.confirm" />
            </Button>
        </div>
    );
};

export default SubscribeModal;
