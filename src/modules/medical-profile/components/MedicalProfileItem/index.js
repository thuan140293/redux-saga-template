import React from "react";
import { Card, Row, Col, Popconfirm } from "antd";
import {
  CloudUploadOutlined,
  CalendarOutlined,
  DeleteOutlined,
  EditOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { get } from "lodash";
import { EyeOutlined } from "@ant-design/icons";
import moment from "moment";
import "./styles.scss";
import { Link } from "react-router-dom";
import { injectIntl } from "react-intl";

const MedicalProfileItem = ({ data, onDelete, onUpdate, onDetail, intl }) => {
  return (
    <Card
      className={`medical-profile ${
        data.is_public ? "is_public" : "un_public"
      }`}
    >
      <div className="t-right">
        {!data.is_public && (
          <LockOutlined
            className="icon-action"
            title={intl.formatMessage({ id: 'medical-profile.medicalProfileItem.profileLocked' })}
            style={{ color: "red" }}
          />
        )}
        {onUpdate && (
          <EditOutlined
            className="icon-action"
            title={intl.formatMessage({ id: 'medical-profile.medicalProfileItem.profileUpdate' })}
            onClick={() => onUpdate(data)}
          />
        )}
        {onDelete && (
          <Popconfirm
            title={intl.formatMessage({ id: 'medical-profile.medicalProfileItem.confirm' })}
            onConfirm={() => onDelete(data.id)}
            onCancel={() => null}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined title={intl.formatMessage({ id: 'medical-profile.medicalProfileItem.delete' })} className="icon-action" />
          </Popconfirm>
        )}
        {onDetail && (
          <EyeOutlined className="icon-action" onClick={() => onDetail(data)} />
        )}
      </div>
      <Row onClick={() => onDetail && onDetail(data)}>
        <Col sm={6} xs={12}>
          <div className="date-month">{moment(data.date).format("DD/MM")}</div>
          <div className="year">{moment(data.date).format("YYYY")}</div>
        </Col>
        <Col sm={18} xs={12}>
          <div className="title">{intl.formatMessage({ id: 'medical-profile.medicalProfileItem.title' })}</div>
          <div className="hospital">{get(data, "hospital.title")}</div>
          <div className="note">{intl.formatMessage({ id: 'medical-profile.medicalProfileItem.note' })} {get(data, "note")}</div>
        </Col>
      </Row>

      <Row className="upload-file-line mt-3">
        <Col span={12}>
          <Link to={`/medical-profile/file/${get(data, "id")}`}>
            <span className="mr-5">
              <CloudUploadOutlined />
            </span>
            <span className="mr-5">{get(data, "count.files", 0)}</span>
            <span>{intl.formatMessage({ id: 'medical-profile.medicalProfileItem.profile' })}</span>
          </Link>
        </Col>

        <Col
          span={12}
          className="t-right"
          onClick={() => onDetail && onDetail(data)}
        >
          <span className="mr-5">{get(data, "count.schedules") || 0}</span>
          <span className="mr-5">{intl.formatMessage({ id: 'medical-profile.medicalProfileItem.schedules' })}</span>
          <span>
            <CalendarOutlined />
          </span>
        </Col>
      </Row>
    </Card>
  );
};

export default injectIntl(MedicalProfileItem);
