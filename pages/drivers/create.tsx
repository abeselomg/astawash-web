import axios from "axios";
import Router from "next/router";
import React, { useEffect } from "react";
import { URLst } from "utils/constants";
import Layout from "../../src/Layout/index";
import { Button, Col, Form, Input, Row } from "antd";

function DriverCreate() {
  const submitDriver = async (data: any) => {
    axios({
      method: "post",
      url: `${URLst}organization_users`,
      data: data,
    })
      .then((res) => {
        Router.replace("/drivers");
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

  return (
    <Layout>
      <div>
        <Row justify="center">
          <Col xs={24} sm={24} md={24} lg={16}>
            <Form
              onFinish={(e) => {
                let orgId = localStorage.getItem("orgId");
                e.organaization = orgId;
                submitDriver(e);
              }}
            >
              <Form.Item name="name">
                <Input placeholder="Driver Name" />
              </Form.Item>
              <Form.Item>
                <Row justify="center" gutter={24}>
                  <Col span={12}>
                    {" "}
                    <Button block type="primary" htmlType="submit">
                      Add
                    </Button>
                  </Col>
                  <Col span={12}>
                    {" "}
                    <Button
                      block
                      danger
                      type="primary"
                      onClick={() => Router.back()}
                    >
                      Cancel
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
            {/* <DriverLicenseForm
              disabled={false}
              isCreating={true}
              licenseLevel={license}
              onFinish={(e: any) => {
                submitLicense(e);
              }}
            /> */}
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export default DriverCreate;
