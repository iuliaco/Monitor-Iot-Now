import React from 'react';
import ReactDOM from 'react-dom';
import { Form, DatePicker, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Radio  } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { registerUser } from '../actions/authentication';

class Register extends React.Component {
  state = {
    confirmDirty: false,
    value: 0,
    errors: {}

  };

  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        const values = {
          ...fieldsValue,
          'birthdate': fieldsValue['birthdate'].format('YYYY-MM-DD')};
        console.log('Received values of form: ', values);
        this.props.registerUser(values, this.props.history);

      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  componentDidMount() {
    if( this.props.auth &&  this.props.auth.isAuthenticated) {
        this.props.history.push('/');
    }
}

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }


  render() {
    const { getFieldDecorator } = this.props.form;

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
    const config = {
      rules: [{ type: 'object', required: true, message: 'Please select time!' }],
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="E-mail"
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'E-mailul nu este valid!',
            }, {
              required: true, message: 'E-mailul este obligatoriu!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Nume de utilizator"
        >
          {getFieldDecorator('username', {
            rules: [ {
              required: true, message: 'Numele de utilizator este obligatoriu!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Parola"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Parola este obligatorie!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Confirma parola"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Trebuie sa va confirmati parola!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Numele de familie"
        >
          {getFieldDecorator('name', {
            rules: [ {
              required: true, message: 'Numele de familie este obligatoriu!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Prenume"
        >
          {getFieldDecorator('surname', {
            rules: [ {
              required: true, message: 'Prenumele este obligatoriu!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Sex"
        >
         {getFieldDecorator('gender')(
        <RadioGroup onChange={this.onChange} value={this.state.value}>
        <Radio value={0}>Masculin</Radio>
        <Radio value={1}>Feminin</Radio>
            
      </RadioGroup>
          )}
      </FormItem>
        <FormItem
          {...formItemLayout}
          label="Data nasterii"
        >
          {getFieldDecorator('birthdate', config)(
            <DatePicker />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Register</Button>
 
        </FormItem>
      </Form>
      
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});


export default withRouter(connect(mapStateToProps,{ registerUser })(Form.create()(Register)));
