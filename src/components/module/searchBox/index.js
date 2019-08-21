import { Form, Row, Col, Input, Button, Icon , Select} from 'antd'
import React, { useState } from 'react'
import './style.scss'
const { Option } = Select;
function SearchBox (props) {
  const needExpand = props.list.length > 6;
  const [expand, setExpand] = useState(false);
  function renderSelect(obj) {
    let opts = obj.options ? obj.options : []
    return (
      <Select>
        {
          opts.map(option => 
            <Option value={option.value} key={option.value}>{option.label}</Option>
          )
        }
      </Select>
    )
  }
  function getFields () {
    const count = expand ? 10 : 6;
    const { getFieldDecorator } = props.form;
    const getComponent = (obj) => {
      switch(obj.type) {
        case 'input': return <Input></Input>;
        case 'select': return renderSelect(obj);
      }
    };
    return props.list.map((item, index) => 
      <Col span={6} key={index} style={{ display: index < count ? 'block' : 'none' }}>
        <Form.Item label={`${item.label}`}>
          {getFieldDecorator(`${item.name}`, {
            rules: item.rule || [],
          })(getComponent(item))}
        </Form.Item>
      </Col>
    );
  }
  function handleSearch (e) {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      props.onSearch(values);
    });
  }
  function handleReset () {
    props.form.resetFields();
  }
  function toggle () {
    setExpand(!expand)
  };
  return (
    <Form className="search-form" onSubmit={handleSearch}>
      <Row gutter={24}>{getFields()}</Row>
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button className="search-box-btn" type="primary" htmlType="submit">搜索</Button>
          <Button className="search-box-btn" onClick={handleReset}>清空</Button>
          {
            needExpand && 
            <a className="expand-btn" onClick={toggle}>
              { expand ? '收起' : '展开' }
              <Icon type={expand ? 'up' : 'down'} />
            </a>
          }
        </Col>
      </Row>
    </Form>
  );
}
export default Form.create({ name: 'advanced_search' })(SearchBox)