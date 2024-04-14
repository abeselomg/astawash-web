import React, { useEffect, useState } from "react";
import Layout from "../../src/Layout/index";
import { DriverLicenseForm } from "@components/DriverLicense";
import { Col, Row } from "antd";
import axios from "axios";
import { URLst } from "utils/constants";
import Router from "next/router";

function create() {
  const [license, setLicense] = useState([]);
  const [users, setUsers] = useState([]);

  const getLicenseLevel = async () => {
    axios({
      method: "get",
      url: `${URLst}car_setting/license_level`,
    })
      .then((res) => {
        setLicense(res.data.results);
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
  const getDrivers = async () => {
    let orgId = localStorage.getItem("orgId");
    axios({
      method: "get",
      url: `${URLst}organization_users/${orgId}`,
    })
      .then((res) => {
        setUsers(res.data);
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
  const submitLicense = async (data: any) => {
    axios({
      method: "post",
      url: `${URLst}driver_license`,
      data: data,
    })
      .then((res) => {
        Router.replace("/driver-license");
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
    getLicenseLevel();
    getDrivers();
  }, []);

  return (
    <Layout>
      <div>
        <Row justify="center">
          <Col xs={24} sm={24} md={24} lg={16}>
            <DriverLicenseForm
              disabled={false}
              isCreating={true}
              licenseLevel={license}
              onFinish={(e: any) => {
                submitLicense(e);
              }}
              usersList={users}
            />
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export default create;
