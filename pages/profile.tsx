import { Button, Col, Form, Input, Row } from "antd";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "./../src/Layout/index";
import axios from "axios";
import { URLst } from "utils/constants";
import { useForm } from "antd/es/form/Form";
function Profile() {
  const [profile, setProfile] = useState({});
  const getProfile = async () => {
    let orgId = localStorage.getItem("orgId");
    axios({
      method: "get",
      url: `${URLst}organization/${orgId}`,
    })
      .then((res) => {
        setProfile(res.data);
        console.log(" ", res.data);
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

  const updateProfile = async (data: any) => {
    let orgId = localStorage.getItem("orgId");
    axios({
      method: "patch",
      url: `${URLst}organization/${orgId}`,
      data: data,
    })
      .then((res) => {
        setProfile(res.data);
        console.log(" ", res.data);
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
  useEffect(() => {
    if (Object.keys(profile).length > 0) {
      form.setFieldsValue(profile);
    }
  }, [profile]);

  useEffect(() => {
    getProfile();
  }, []);

  const [form] = Form.useForm();

  return (
    <Layout>
      <Form
        form={form}
        onFinish={(e) => {
          updateProfile(e);
        }}
      >
        <Form.Item name="name">
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="description">
          <Input.TextArea placeholder="Description" />
        </Form.Item>
        <Form.Item>
          <Row justify="center" gutter={24}>
            <Col span={12}>
              {" "}
              <Button block type="primary" htmlType="submit">
                Update
              </Button>
            </Col>
            <Col span={12}>
              {" "}
              <Button block danger type="primary" onClick={() => Router.back()}>
                Cancel
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Layout>
  );
}

export default Profile;
