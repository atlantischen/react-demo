import React, { Component } from "react";
import { Form, Icon, Input, Button } from "antd";
import './index.less'
import logo from './img/logo.png'

@Form.create()
class Login extends Component {
   validator=(rule,value,callback)=>{
    const name = rule.field === "username" ? "用户名" : "密码";
    if(!value){
      callback("请输入" + name)
    }else if(value.length<4){
      callback(name + "长度至少大于4位");
    }else if(value.length>13){
      callback(name + "长度至少小于13位")
    }else if(!/^\w+$/.test(value)){
      callback(name + "只能包含英文、数字和下划线");
    }else{
      callback();
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="" />
          <h1>React项目: 后台管理系统</h1>
        </header>
        <section className="header-section">
          <h3>用户登录</h3>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [
                  // { required: true, message: "Please input your username!" }
                  {validator:this.validator}
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="请输入用户名"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  // { required: true, message: "Please input your Password!" }
                  {validator:this.validator}
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="请输入密码"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}
export default Login;
