import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { FaArrowRightLong } from "react-icons/fa6";
import axios from "axios";
import { URLst } from "utils/constants";
import redirect from "next/router";
const LoginRequest = (data: any) => {
  axios({
    method: "post",
    url: `${URLst}auth/org-login`,
    data: data,
  })
    .then((res) => {
      localStorage.setItem("token", res.data.tokens.access.token);
      localStorage.setItem("orgId", res.data.user.organaization.id);
      localStorage.setItem("orgName", res.data.user.organaization.name);


      redirect.replace("/");
    })
    .catch((err) => {
      console.log(" ", err);
      let error;
      if (err.response) {
        error = err.message + " " + err.response.data;
      }
      if (err.request) {
        error = err.message + "Faild request, Try Again!";
      }
    });
};

const Login: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    LoginRequest(values);
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div>
        <img src="astawash_logo.png" width={300} />
        <p className="text-center text-sm font-bolder">
          One Reminder at a time.
        </p>
      </div>
      <Form
        name="normal_login"
        labelCol={{ span: 24 }}
        requiredMark={false}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          label={<div className="m-0 p-0 font-bolder">Email</div>}
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="johndoe@gmail.com" />
        </Form.Item>
        <Form.Item
          name="password"
          label={<div className="m-0 p-0 font-bolder">Password</div>}
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="*****************"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            block
            htmlType="submit"
            className="w-full"
            // icon={<FaArrowRightLong />}
          >
            <div className="flex gap-4 justify-center items-center">
              <>Log in</> <FaArrowRightLong />
            </div>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
