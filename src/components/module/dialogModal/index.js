import React from 'react'
import { Modal, Button ,Icon } from 'antd'
import './style.scss'
class DialogModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = { visible: false };
    }
    showModal = () => {
      this.setState({
        visible: true,
      });
    };
  
    handleOk = e => {
      console.log(e);
      this.props.onConfirm()
    };
  
    handleCancel = e => {
      console.log(e);
      this.props.onCancel()
    };
    static getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.value !== prevState.visible) {
        return {
          value: nextProps.value
        }
      }
      return null;
    }
    componentDidUpdate(prevProps, prevState) {
      if (prevState.visible != this.props.value) {
        this.setState({
          visible: this.props.value
        });
      }
    }
  
    render() {
      return (
          <Modal
            title={this.props.data.title}
            visible={this.props.value}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            className="dialog-modal"
            okText="确定"
            cancelText="取消"
          >
            <p><Icon className="modal-icon" type={this.props.data.type}/>{this.props.data.text}</p>
          </Modal>
      );
    }
  }
  export default DialogModal;