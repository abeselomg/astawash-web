import { DriverLicenseForm } from "@components/DriverLicense";
import { Button, Col, Collapse, CollapseProps, Row, theme } from "antd";
import Layout from "../../src/Layout/index";
import { useRouter } from "next/router";
import React, { CSSProperties, useEffect, useState } from "react";
import { PiPlus } from "react-icons/pi";
import axios from "axios";
import { URLst } from "utils/constants";
import dayjs from "dayjs";

function DriverLicense() {
  const router = useRouter();
  const [license, setLicense] = useState([]);
  const [users, setUsers] = useState([]);

  const getLicense = async () => {
    let orgId = localStorage.getItem("orgId");
    axios({
      method: "get",
      url: `${URLst}driver_license/org/${orgId}`,
    })
      .then((res) => {
        setLicense(res.data);
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
    license.map((e: any, i) => {
      e.issue_date = dayjs(e.issue_date);
      e.expiration_date = dayjs(e.expiration_date);
      e.license_level = e.license_level.name;
      e.organaization_user = e.organaization_user?.name;

      return {
        key: i,
        label: e.organaization_user + " - " + e.license_level,
        children: (
          <DriverLicenseForm disabled isCreating={false} defaultValue={e} />
        ),
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
    getLicense();
  }, []);

  return (
    <Layout>
      <Row justify="center">
        <Col xs={24} sm={24} md={24} lg={16}>
          <div className="text-right my-2">
            {" "}
            <Button
              icon={<PiPlus />}
              type="primary"
              onClick={() => {
                router.push("driver-license/create");
              }}
            >
              Add
            </Button>
          </div>

          <Collapse
            bordered={false}
            accordion
            defaultActiveKey={["1"]}
            style={{ background: "transparent" }}
            items={getItems(panelStyle)}
          />
        </Col>
      </Row>
    </Layout>
  );
}

export default DriverLicense;
