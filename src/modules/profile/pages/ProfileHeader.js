import React, { useEffect } from "react";
import "./index.scss";
import { Avatar, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getVerifyCode, updateStateUser } from "../redux/actions";
import { get } from "lodash";
import CopyOutlined from "@ant-design/icons/lib/icons/CopyOutlined";
import ReloadOutlined from "@ant-design/icons/lib/icons/ReloadOutlined";
import { toast } from "react-toastify";
import { ROOT_API_URL } from "../../../commons/constants";
import Cookies from "js-cookie";
import { updatedAvatar } from "../../auth/redux/actions";
import { FormattedMessage, injectIntl } from "react-intl";

const ULR_LINK_REF = `${process.env.REACT_APP_USER_URL}/signup?sponsorkey=`;

export default injectIntl(function ProfileHeader({
  avatar,
  name,
  id,
  verifyCode = {},
  dispatch,
  authUser,
  intl,
}) {
  const sponsorKey = get(authUser, "sponsorKey", "");
  const linkRef = `${ULR_LINK_REF}${sponsorKey}`;
  // const [state, setState] = useState({
  //   fileAvatar: null,
  //   previewImageAvatar: 'https://via.placeholder.com/150x150',
  // });

  useEffect(() => {
    if (dispatch) {
      dispatch(getVerifyCode());
    }
  }, [dispatch]);

  const handleGetVerifyCode = () => {
    dispatch(getVerifyCode());
  };

  const copyHealthCode = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(linkRef);
    toast(
      `${intl.formatMessage({
        id: "profile.profileHeader.copyHealthCode",
      })} ${linkRef}!`
    );
  };

  const copyVerifyCode = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(sponsorKey);
    toast(
      `${intl.formatMessage({
        id: "profile.profileHeader.copyVerifyCode",
      })} ${sponsorKey}!`
    );
  };

  const checkFile = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (isJpgOrPng) {
      if (isLt2M) {
        // setState((prevState) =>({
        //   ...prevState,
        //   fileAvatar: file,
        // }));
      } else {
        toast.error("Image must smaller than 10MB!");
      }
    } else {
      toast.error("You can only upload JPG, PNG file!");
    }
    return isJpgOrPng && isLt2M;
  };

  const customRequest = ({ onSuccess, onError, file }) => {
    if (checkFile(file)) {
      const data = new FormData();
      data.append("first_name", authUser.first_name);
      data.append("last_name", authUser.last_name);
      data.append("phone_number", authUser.phone_number);
      data.append("gender", authUser.gender);
      data.append("passport", authUser.passport);
      data.append("address", authUser.address);
      data.append("country", authUser.country);
      data.append("province", authUser.province);
      data.append("image", file);

      fetch(`${ROOT_API_URL}/update-profile`, {
        method: "POST",
        body: data,
        headers: { Authorization: Cookies.get("token") },
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.status_code === 200) {
            sessionStorage.setItem("USER_INF", JSON.stringify(response.data));
            dispatch(updateStateUser(response.data));
            dispatch(updatedAvatar(response.data));
          }
        })
        .catch((err) => {
          toast.error(err);
        });
    }
  };

  return (
    <>
      <div className="profile-header-container">
        <div className="profile-info-wrapper">
          <div className="profile-avatar gx-profile-banner-avatar">
            {/* <img src={'https://picsum.photos/200/300'} alt="avatar" className="profile-img"/>*/}
            <Avatar
              className="profile-img"
              alt="..."
              src={avatar}
              icon={<UploadOutlined />}
              size={150}
            />
            <Upload
              accept=".jpg,.jpeg,.png"
              showUploadList={false}
              customRequest={customRequest}
            >
              <div className="mask-upload">
                <i className="icon icon-upload" />
              </div>
            </Upload>
          </div>
          <div className="profile-info">
            <div className="profile-name">{name}</div>
            <div className="profile-id">
              <a href={linkRef}><FormattedMessage id="dashboard.linkRef" /></a>
              <CopyOutlined onClick={copyHealthCode} />
            </div>
            <div className="profile-verify-code">
              {sponsorKey && (
                <p className="gx-py-2">
                  <FormattedMessage id="dashboard.refCode" />
                  {": "} {sponsorKey}
                  {""}
                  <CopyOutlined onClick={copyVerifyCode} />
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
