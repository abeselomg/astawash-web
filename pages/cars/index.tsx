import React, { CSSProperties, useEffect, useState } from "react";
import { Button, Col, Collapse, CollapseProps, Row, theme } from "antd";
import Layout from "../../src/Layout/index";
import { CarForm } from "@components/Cars";
import { PiPlus } from "react-icons/pi";
import { useRouter } from "next/router";
import axios from "axios";
import { URLst } from "utils/constants";
import dayjs from "dayjs";

function Cars() {
  const router = useRouter();
  const [cars, setCars] = useState([]);
  const getCars = async () => {
    let orgId = localStorage.getItem("orgId");
    axios({
      method: "get",
      url: `${URLst}car/org/${orgId}`,
    })
      .then((res) => {
        setCars(res.data);
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
  const getItems: (panelStyle: CSSProperties) => CollapseProps["items"] = (
    panelStyle
  ) =>
    cars?.map((e: any, i) => {
      let df = { ...e };
      df.full_insurance_expiration_date = dayjs(
        df.full_insurance_expiration_date
      );
      df.bolo_expiration_date = dayjs(df.bolo_expiration_date);
      df.third_party_expiration_date = dayjs(df.third_party_expiration_date);
      df.regionId = df.region?.region;
      df.codeId = df.code?.code;
      df.carBrandId = df.car_brand?.name;
      return {
        key: i,
        label: df.plate_number + " : " + df.carBrandId,
        children: <CarForm disabled isCreating={false} defaultValue={df} />,
        style: panelStyle,
      };
    });

  const { token } = theme.useToken();

  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: "white",
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  useEffect(() => {
    getCars();
  }, []);

  return (
    <Layout>
      <div>
        <Row justify="center">
          <Col xs={24} sm={24} md={24} lg={16}>
            <div className="text-right my-2">
              {" "}
              <Button
                icon={<PiPlus />}
                type="primary"
                onClick={() => {
                  router.push("cars/create");
                }}
              >
                Add Car
              </Button>
            </div>

            <Collapse
              bordered={false}
              accordion
              defaultActiveKey={["0"]}
              style={{ background: "transparent" }}
              items={getItems(panelStyle)}
            />
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export default Cars;
