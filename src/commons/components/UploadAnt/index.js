import React, { useRef } from "react";
import { Popconfirm, Row, Col } from "antd";
import {
  UploadOutlined,
  MinusCircleOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import * as moment from "moment";
import "./styles.scss";
import { intl } from "helpers/reactInil";

export const checkIsImage = (url) => {
  const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
  if (allowedExtensions.exec(url)) {
    return true;
  }
  return false;
};

const UploadAnt = ({ onChange, listFile, onDelete }) => {
  const inputRef = useRef(null);

  const triggerUpload = () => {
    inputRef.current.click();
  };

  const handleChangeFile = (e) => {
    onChange && onChange(e.target.files);
    e.target.value = null;
    inputRef.current.value = null;
  };

  return (
    <>
      <input
        multiple
        onChange={handleChangeFile}
        ref={inputRef}
        type="file"
        hidden
      />
      <div className="upload-ant-custom">
        <Row gutter={24}>
          <Col span={6} md={6} sm={8} xs={24}>
            <div onClick={triggerUpload} className="control-upload">
              <UploadOutlined className="icon" />
            </div>
          </Col>
          {(listFile || []).map((file) => (
            <Col key={file.id} span={6} md={6} sm={8} xs={24}>
              <div
                key={file.id}
                className={`file-item ${
                  !checkIsImage(file.url) && "background-file"
                }`}
              >
                {checkIsImage(file.url) && (
                  <img
                    onClick={() => window.open(file.url)}
                    src={file.url}
                    alt="file"
                  />
                )}
                {!checkIsImage(file.url) && (
                  <span>
                    <FilePdfOutlined
                      onClick={() => window.open(file.url)}
                      className="icon-file"
                    />
                  </span>
                )}
                <div className="created-date">
                  {moment(file.created_at).format("DD/MM/YYYY")}
                </div>
                <Popconfirm
                  title={intl.formatMessage({ id: "tUploadAnt.title" })}
                  onConfirm={() => onDelete && onDelete(file.id)}
                  onCancel={() => null}
                  okText={intl.formatMessage({ id: "tUploadAnt.ok" })}
                  cancelText={intl.formatMessage({ id: "tUploadAnt.no" })}
                >
                  <MinusCircleOutlined className="icon-delete" />
                </Popconfirm>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default UploadAnt;
