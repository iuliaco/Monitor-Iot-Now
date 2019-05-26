import React from 'react';
import ReactDOM from 'react-dom';
import { Button,Typography  } from 'antd';
import { Layout } from 'antd';
import { Row, Col } from 'antd';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Icon, Input,  Checkbox, Radio, InputNumber, Tag, Tooltip } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
const { Text,Title } = Typography;

const { Header, Footer, Sider, Content } = Layout;


class AdminView extends React.Component {
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
        console.log(this.props);
        console.log(this.props.auth.user);
        values={
          userId:this.props.auth.user.user._id,
          ...values
        };
        console.log('Received values of form: ', values);
        axios.post(`/user/tables`, values)
  .then(res => {
    console.log(res);
    console.log(res.data);
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
          md:{ span:8   }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 14 },
          md: { span: 12 },

        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 24,
            offset: 0,
          },
        },
      };
    return (
<div>
<br/>
<Title level={3}>Creeaza un tabel</Title>
    <Form onSubmit={this.handleSubmit} classtitle="login-form">
    <FormItem
              {...formItemLayout}
              label="Titlul graficului"
              >
      {getFieldDecorator('title', {
        rules: [{ required: true, message: 'Completarea acestui camp este obligatorie!' }],
      })(
        <Input  placeholder="Titlu" />
      )}
    </FormItem>
    <FormItem
              {...formItemLayout}
              label="Numele axei veritcale"
              >
      {getFieldDecorator('value1_name', {
        rules: [{ required: true, message: 'Completarea acestui camp este obligatorie!' }],
      })(
        <Input   placeholder="Prima axa" />
      )}
    </FormItem>
    <FormItem
              {...formItemLayout}
              label="Numele axei orizontale"
              >
      {getFieldDecorator('value2_name', {
        rules: [{ required: true, message: 'Completarea acestui camp este obligatorie!' }],
      })(
        <Input placeholder="A doua axa"  />          )}
    </FormItem>
      <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Creare</Button>
        </FormItem>
  </Form>
</div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth:state.auth
})
export default withRouter(connect(mapStateToProps)(Form.create()(AdminView)));