import React from 'react'
import { Modal, Icon } from 'antd'
import './style.scss'
function DialogModal (props) {
  function  handleOk () {
    props.onConfirm();
  }
  function handleCancel () {
    props.onCancel();
  }
  return (
    <Modal
      title={props.data.title}
      visible={props.value}
      onOk={handleOk}
      onCancel={handleCancel}
      className="dialog-modal"
      okText="确定"
      cancelText="取消"
    >
      <p><Icon className="modal-icon" type={props.data.type}/>{props.data.text}</p>
    </Modal>
  );
}
export default DialogModal;