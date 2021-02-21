import React, {useEffect, useState} from 'react';
import {Button, Form, Input, Modal, Table} from 'antd';
// import IntlMessage from "util/IntlMessages";
import SweetAlert from 'react-bootstrap-sweetalert';
import {createBank, deleteBank, getListBank, openBankDialog, updateBank} from '../redux/actions';
import {forOwn, map} from 'lodash';
import EditOutlined from '@ant-design/icons/lib/icons/EditOutlined';
import DeleteOutlined from '@ant-design/icons/lib/icons/DeleteOutlined';
import { injectIntl } from 'react-intl';

export default injectIntl(function BankManager({dispatch, bankForm, isOpenBankDialog, banks = [], intl}) {
  useEffect(() => {
    dispatch(getListBank());
  }, [dispatch]);

  const [state, setState] = useState({
    idUpdate: 0,
    idDel: 0,
    warning: false,
  });

  const showModal = () => {
    resetModal();
    dispatch(openBankDialog(true));
  };

  const resetModal = () => {
    bankForm.resetFields();
    setState((prevState) => ({
      ...prevState,
      idUpdate: 0,
      idDel: 0,
    }));
  };

  const hideModal = () => {
    dispatch(openBankDialog(false));
    resetModal();
  };

  const handleSubmitForm = (data) => {
    const {idUpdate} = state;
    if (idUpdate !== 0) {
      data.id = idUpdate;
      dispatch(updateBank(data));
    } else {
      dispatch(createBank(data));
    }
  };


  const getDataForTable = (banks) => {
    let result = [];
    if (banks.length) {
      result = map(banks, (item, index) => {
        let obj = {key: index + 1};
        forOwn(item, (value, key) => {
          obj = {...obj, [key]: value};
        });
        return obj;
      });
    }
    return result;
  };

  const showEdit = (e, record) => {
    e.preventDefault();
    bankForm.setFieldsValue({
      account_code: record.account_code,
      account_name: record.account_name,
      account_address: record.account_address,
      account_number: record.account_number,
    });
    setState((prevState) => ({...prevState, idUpdate: record.id}));
    dispatch(openBankDialog(true));
  };

  const showAlert = (e, record) => {
    e.preventDefault();
    setState((prevState) => ({
      ...prevState,
      warning: true,
      idDel: record.id,
    }));
  };

  const onDeleteRecord = () => {
    setState((prevState) => ({
      ...prevState,
      warning: false,
    }));
    dispatch(deleteBank(state.idDel));
  };


  const onCancelDelRecord = () => {
    setState((prevState) => ({
      ...prevState,
      idDel: 0,
      warning: false,
    }));
  };

  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: intl.formatMessage({ id: 'profile.bankManager.accountName' }),
      dataIndex: 'account_name',
      key: 'account_name',
    },
    {
      title: intl.formatMessage({ id: 'profile.bankManager.accountNumber' }),
      dataIndex: 'account_number',
      key: 'account_number',
    },
    {
      title: intl.formatMessage({ id: 'profile.bankManager.accountCode' }),
      dataIndex: 'account_code',
      key: 'account_code',
    },
    {
      title: intl.formatMessage({ id: 'profile.bankManager.accountAddress' }),
      dataIndex: 'account_address',
      key: 'account_address',
    },
    {
      title: intl.formatMessage({ id: 'profile.bankManager.action' }),
      dataIndex: 'index',
      key: 'action',
      width: '10%',
      render: (text, record) => {
        return (
          <div className="st-action-tb">
            <a onClick={(e) => showEdit(e, record)} href={() => false}>
              <EditOutlined/>
            </a>
            <a onClick={(e) => showAlert(e, record)} href={() => false}>
              <DeleteOutlined/>
            </a>
          </div>
        );
      },
    },
  ];
  return (
    <div className="manage-bank">
      <div className="header-bank">
        <Button type="primary" icon="+ " onClick={showModal}>
                    {intl.formatMessage({ id: 'profile.bankManager.addNewBankDialog' })}
        </Button>
      </div>
      <div className="table-bank">
        <Table
          dataSource={getDataForTable(banks)}
          columns={columns}
        />
      </div>
      <SweetAlert
        show={state.warning}
        warning
        showCancel
        confirmBtnText={intl.formatMessage({ id: 'profile.bankManager.confirmBtnText' })}
        cancelBtnText={intl.formatMessage({ id: 'profile.bankManager.cancelBtnText' })}
        confirmBtnBsStyle="danger"
        cancelBtnBsStyle="default"
        title={intl.formatMessage({ id: 'profile.bankManager.titleWarning' })}
        onConfirm={onDeleteRecord}
        onCancel={onCancelDelRecord}
      />
      <Modal
        visible={isOpenBankDialog}
        title={intl.formatMessage({ id: 'profile.bankManager.addNewBankDialog' })}
        onOk={handleSubmitForm}
        onCancel={hideModal}
        footer={false}
      >
        <Form
          layout="vertical"
          form={bankForm}
          onFinish={handleSubmitForm}
        >
          <Form.Item
            name="account_name"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'profile.bankManager.accountNameMess' })
              },
            ]}
          >
            <Input placeholder={intl.formatMessage({ id: 'profile.bankManager.accountNamePlaceholder' })}/>
          </Form.Item>
          <Form.Item
            name="account_number"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'profile.bankManager.accountNumberMess' })
              },
            ]}
          >
            <Input placeholder={intl.formatMessage({ id: 'profile.bankManager.accountNumberPlaceholder' })}/>
          </Form.Item>
          <Form.Item
            name="account_code"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'profile.bankManager.accountCodeMess' })
              },
            ]}
          >
            <Input placeholder={intl.formatMessage({ id: 'profile.bankManager.accountCodePlaceholder' })}/>
          </Form.Item>
          <Form.Item
            name="account_address"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'profile.bankManager.accountAddressMess' })
              },
            ]}
          >
            <Input placeholder={intl.formatMessage({ id: 'profile.bankManager.accountAddressPlaceholder' })}/>
          </Form.Item>

          <Form.Item>
            <Button
              key=" back"
              className="m-r-20"
              onClick={hideModal}
            >
                            {intl.formatMessage({ id: 'profile.bankManager.cancelBtnText' })}
            </Button>
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              // loading={this.props.generalData.loadingBTN}
            >
                            {intl.formatMessage({ id: 'profile.bankManager.saveBtnText' })}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
)