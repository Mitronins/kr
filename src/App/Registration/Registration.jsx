import React from 'react'
import { Form, Input, Button } from 'antd'

import styles from './styles.scss'
import { dataBase } from '../../Root'
import { history } from '../../App/App'
import { USERS_TABLE } from '../../constans'
import { connect } from 'react-redux'
import { setAuth } from '../../AC/users'

class RegistrationCmp extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const newUserId = dataBase.insert(USERS_TABLE, {
          login: values['username'],
          pass: values['password'],
        });
        dataBase.commit();
        localStorage.setItem('isAuth', 'true')
        this.props.setAuth('true')
        history.push('sings')
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
            Sign up
          </Button>
        </Form>
      </div>
    )
  }
}

export const Registration = connect(null, { setAuth })(Form.create()(RegistrationCmp))
