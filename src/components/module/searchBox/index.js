import { Form, Row, Col, Input, Button, Icon , Select} from 'antd'
import React from 'react'
import './style.scss'
const { Option } = Select;
class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false,
    };
    this.needExpand = this.props.list.length > 6;
  }

  renderSelect(obj) {
    let opts = obj.options ? obj.options : []
    return <Select>
      {
        opts.map(option => 
          <Option value={option.value} key={option.value}>{option.label}</Option>
        )
      }
    </Select>
  }

  // To generate mock Form.Item
  getFields() {
    const count = this.state.expand ? 10 : 6;
    const { getFieldDecorator } = this.props.form;
    const getComponent = (obj) => {
      switch(obj.type) {
        case 'input': return <Input></Input>;
        case 'select': return this.renderSelect(obj);
      }
    };
    return this.props.list.map((item, index) => 
      <Col span={6} key={index} style={{ display: index < count ? 'block' : 'none' }}>
        <Form.Item label={`${item.label}`}>
          {getFieldDecorator(`${item.name}`, {
            rules: item.rule || [],
          })(getComponent(item))}
        </Form.Item>
      </Col>
    );
  }

  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };

  render() {
    return (
      <Form className="search-form" onSubmit={this.handleSearch}>
        <Row gutter={24}>{this.getFields()}</Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button className="search-box-btn" type="primary" htmlType="submit">搜索</Button>
            <Button className="search-box-btn" onClick={this.handleReset}>清空</Button>
            {
              this.needExpand && 
              <a className="expand-btn" onClick={this.toggle}>
                { this.state.expand ? '收起' : '展开' }
                <Icon type={this.state.expand ? 'up' : 'down'} />
              </a>
            }
          </Col>
        </Row>
      </Form>
    );
  }
}
export default Form.create({ name: 'advanced_search' })(SearchBox)