import React, { useEffect, useState } from "react";
import Layout from "../../src/Layout/index";
import { CarForm } from "@components/Cars";
import { Col, Row } from "antd";
import axios from "axios";
import { URLst } from "utils/constants";
import Router from "next/router";

function create() {
  const [region, setRegion] = useState([]);
  const [brand, setBrand] = useState([]);
  const [code, setCode] = useState([]);

  const getCarRegion = async () => {
    axios({
      method: "get",
      url: `${URLst}car_setting/car_region`,
    })
      .then((res) => {
        setRegion(res.data.results);
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
  const getCarBrand = async () => {
    axios({
      method: "get",
      url: `${URLst}car_setting/car_brand`,
    })
      .then((res) => {
        setBrand(res.data.results);
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
  const getCarCode = async () => {
    axios({
      method: "get",
      url: `${URLst}car_setting/car_code`,
    })
      .then((res) => {
        setCode(res.data.results);
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
  const submitCar = async (data: any) => {
    axios({
      method: "post",
      url: `${URLst}car`,
      data: data,
    })
      .then((res) => {
        Router.replace("/cars");
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
    getCarRegion();
    getCarBrand();
    getCarCode();
  }, []);

  return (
    <Layout>
      <div>
        <Row justify="center">
          <Col xs={24} sm={24} md={24} lg={16}>
            <CarForm
              disabled={false}
              isCreating={true}
              carRegion={region}
              carBrand={brand}
              carCode={code}
              onFinish={(e:any) => {
                submitCar(e);
              }}
            />
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export default create;
