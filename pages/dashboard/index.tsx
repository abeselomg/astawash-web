import React, { useEffect, useState } from "react";
import Layout from "../../src/Layout/index";
import { Avatar, Col, Divider, List, Row, Space } from "antd";
import { LuCar } from "react-icons/lu";
import axios from "axios";
import { URLst } from "utils/constants";
import dayjs from "dayjs";
import Router from "next/router";
interface DashCardType {
  name: string;
  value: number;
  route: string;
}

interface DashboardType {
  count: any;
  thisweek: any;
}

interface DashboardData {
  [key: string]: any[];
}
interface CarData {
  car_brand: {
    name: string;
  };
  plate_number: string;
}

const DashCard = ({ name, value, route }: DashCardType) => {
  return (
    <div
      className="w-full bg-white rounded-lg text-right p-4 relative shadow-lg mt-2 mb-2 cursor-pointer"
      onClick={() => {
        Router.push(route);
      }}
    >
      <div className="font-light text-xl text-primary">{name}</div>
      <div className="font-bold text-lg text-primary">{value}</div>

      <div
        className="absolute left-5 bg-gradient-to-b from-white to-gray-400 p-3 rounded-lg"
        style={{ top: "-10px" }}
      >
        <LuCar size={20} />
      </div>
    </div>
  );
};
function Dashboard() {
  const [dashboard, setDashboard] = useState<DashboardType>({
    count: null,
    thisweek: null,
  });
  const getDashboard = async () => {
    let orgId = localStorage.getItem("orgId");
    axios({
      method: "get",
      url: `${URLst}organization/dashboard/${orgId}`,
    })
      .then((res) => {
        setDashboard(res.data);
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
    getDashboard();
  }, []);

  return (
    <Layout>
      <div>
        {/* <div className="w-full bg-gray-200 p-3 rounded-lg shadow-md my-4">
          {[
            {
              date: dayjs(
                dashboard?.reminder?.third_party_expiration_date
                  ?.third_party_expiration_date
              ).format("DD/MM/YYYY"),
              type: "Third Party ",
            },
            {
              date: dayjs(
                dashboard?.reminder?.bolo_expiration_date?.bolo_expiration_date
              ).format("DD/MM/YYYY"),
              type: "Bolo",
            },
            {
              date: dayjs(
                dashboard?.reminder?.full_insurance_expiration_date
                  ?.full_insurance_expiration_date
              ).format("DD/MM/YYYY"),
              type: "Full Insurance",
            },
            {
              date: dayjs(
                dashboard?.reminder?.license_expiration_date?.expiration_date
              ).format("DD/MM/YYYY"),
              type: "Driver License",
            },
          ].map((d) => (
            <>
              <div className="w-full flex justify-between text-primary ">
                <div>{d.type}</div>
                <div>{d.date}</div>
              </div>
              <Divider className="bg-primary mt-1 mb-1" />
            </>
          ))}
        </div> */}
        <div className=" mb-4">
          <Row gutter={12}>
            <Col sm={24} md={8}>
              <DashCard
                name="Total Cars"
                value={dashboard?.count?.cars}
                route="cars"
              />
            </Col>
            <Col sm={24} md={8}>
              <DashCard
                name="Total Licenses"
                value={dashboard?.count?.licenses}
                route="driver-license"
              />
            </Col>

            <Col sm={24} md={8}>
              <DashCard
                name="Total Drivers"
                value={dashboard?.count?.Drivers}
                route="drivers"
              />
            </Col>
          </Row>
        </div>
        <div className="w-full bg-white rounded-lg p-3">
          <div className="text-lg font-semibold  text-primary">
            Due this week
          </div>

          {Object.entries(dashboard?.thisweek || {}).map(
            ([key, value]: any) => (
              <div key={key}>
                <Divider orientation="left">
                  <h2>
                    {key.charAt(0).toUpperCase() +
                      key.slice(1).replace("_", " ")}
                  </h2>
                </Divider>

                {value.length > 0 ? (
                  <List
                    size="small"
                    bordered
                    dataSource={value}
                    renderItem={(item: CarData) => (
                      <List.Item>
                        {item.car_brand.name}: {item.plate_number}
                      </List.Item>
                    )}
                  />
                ) : (
                  <p>No items available</p>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
