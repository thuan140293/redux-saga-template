import React, { useState, useEffect } from "react";
import { Card, Row, Col, Tag, Popconfirm, Empty } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { get } from 'lodash';
import * as moment from 'moment';
import PropTypes from 'prop-types';
import './styles.scss';
import { injectIntl } from "react-intl";

const ScheduleSection = ({
  header,
  data,
  isShowContent,
  onUpdate,
  onDelete,
  typeSchedule,
  updateScheduleStatus,
  onGoToMedicalProfile,
  intl
}) => {
  const [showContent, setShowContent] = useState(false);
  useEffect(() => {
    setShowContent(isShowContent || false);
  }, [isShowContent]);

  return (
    <div className="schedule-section">
      <div className="header" onClick={() => setShowContent(!showContent)}>
        {header} ({get(data, "total")})
      </div>

      {showContent && (
        <>
          {get(data, "data").length === 0 && (
            <Empty description={intl.formatMessage({ id: 'medical-profile.scheduleSection.noData' })} />
          )}
          {get(data, 'data').map(item => (
            <Card onClick={() => onGoToMedicalProfile(item)} className='content mt-20' key={item.id}>
              <div className='action t-right'>
                {onUpdate && item.status !== 'success' &&
                  <EditOutlined
                    className="icon-action mr-10"
                    title="Update"
                    onClick={() => onUpdate(item)}
                  />
                })
                {onDelete && item.status !== "success" && (
                  <Popconfirm
                    title={intl.formatMessage({ id: 'medical-profile.scheduleSection.titleConfirm' })}
                    onConfirm={() => onDelete(item.id)}
                    onCancel={() => null}
                    okText="Yes"
                    cancelText="No"
                  >
                    <DeleteOutlined title="Delete" className="icon-action" />
                  </Popconfirm>
                )}
              </div>

              <Row gutter={[16, 16]}>
                <Col className="col-left" md={4} xs={8}>
                  <div className="time">
                    {moment(item.schedule_at).format("HH:mm")}
                  </div>
                  <div className="date">
                    {moment(item.schedule_at).format("DD/MM/YYYY")}
                  </div>
                </Col>
                <Col className="col-right" md={20} xs={16}>
                  <div className="hospital-name">
                  {intl.formatMessage({ id: 'medical-profile.scheduleSection.hospital' })} {get(item, "hospital.title")}
                  </div>
                  <div className="content">
                  {intl.formatMessage({ id: 'medical-profile.scheduleSection.content' })} {get(item, "content")}
                  </div>
                  <div className="text-note">{intl.formatMessage({ id: 'medical-profile.scheduleSection.note' })} {get(item, "note")}</div>

                  <div className="status mt-5">
                    {item.status === "pending" && typeSchedule !== "next" && (
                      <Tag
                        onClick={() => {
                          if (!updateScheduleStatus) {
                            return;
                          }
                          updateScheduleStatus({
                            id: item.id,
                            status: 1,
                            schedule_at: item.schedule_at
                          });
                        }}
                        className="action-complete"
                        color="blue"
                      >
                        {intl.formatMessage({ id: 'medical-profile.scheduleSection.checked' })}
                      </Tag>
                    )}
                    {item.status === "success" && (
                      <Tag color="green">{intl.formatMessage({ id: 'medical-profile.scheduleSection.examined' })}</Tag>
                    )}
                  </div>
                </Col>
              </Row>
            </Card>
          ))}
        </>
      )}
    </div>
  );
};

ScheduleSection.defaultProps = {
  onGoToMedicalProfile: null,
};

ScheduleSection.propTypes = {
  onGoToMedicalProfile: PropTypes.func
};

export default injectIntl(ScheduleSection);
