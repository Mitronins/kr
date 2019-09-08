import React from 'react'
import { Form, Icon, Input, Button } from 'antd'
import styles from './styles.scss'
import { NavLink } from 'react-router-dom'

class LoginCmp extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className={styles.root}>
        <Form onSubmit={this.handleSubmit} className={styles.container}>
          <Form.Item>
            {
              getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                }
              )(
                <Input
                  placeholder="Login"
                />,
              )}
          </Form.Item>
          <Form.Item>
            {
              getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  placeholder="Password"
                />,
              )}
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
          >
            Log in
          </Button>
          <div>
            Or <NavLink to="/registration">register now!</NavLink>
          </div>
        </Form>
      </div>
    )
  }
}

export const Login = Form.create()(LoginCmp)
