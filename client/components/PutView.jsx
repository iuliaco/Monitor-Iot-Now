import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
import { Layout } from 'antd';
import { Row, Col } from 'antd';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Icon, Input,  Checkbox, Radio, InputNumber, Tag, Tooltip } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
import { addPoint, sendPoint } from './socket';

const { Header, Footer, Sider, Content } = Layout;


class PutView extends React.Component {
constructor(props) {
    super(props);

  
  this.state= {
    tables:[]
  }
}
  componentDidMount() {
    if(!this.props.auth.isAuthenticated) {
        this.props.history.push('/about');
    }
    axios.get(`/user/tables`)
    .then(res => {
      const tables = res.data;
      this.setState({ tables });
      console.log(this.state.tables);
    })

  }
  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  saveInputRef = input => this.input = input;

  //endfortags

  handleSubmit = (e) => {
    e.preventDefault();
    const state = this.state;
const inputValue = state.inputValue;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        console.log(`/user/tables/${state.tables[4]._id}`);
        axios.put(`/user/tables/${state.tables[4]._id}`, values)
  .then(res => {
    console.log(res);
   console.log(values);
    this.props.history.push('/');

  })
      }
    });
  };

render()     {
    const { getFieldDecorator } = this.props.form;
    const { tags, inputVisible, inputValue } = this.state;

    const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };
    return (
<div>
    <Form onSubmit={this.handleSubmit} classtitle="login-form">
    
    <FormItem
              {...formItemLayout}
              label="value1"
              >
      {getFieldDecorator('value1')(
  <InputNumber  />,
  )}
    </FormItem>
    
    <FormItem
      {...formItemLayout}
      label="value2"
    >
     {getFieldDecorator('value2')(
   <InputNumber  />,

      )}
  </FormItem>

      <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Register</Button>
        </FormItem>
  </Form>
</div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth:state.auth
})
export default withRouter(connect(mapStateToProps)(Form.create()(PutView)));