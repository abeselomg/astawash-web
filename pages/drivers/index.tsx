import { Avatar, Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import Layout from "../../src/Layout/index";
import { URLst } from "utils/constants";
import axios from "axios";
import Router from "next/router";
import { PiPlus } from "react-icons/pi";

const Users: React.FC = () => {
  const [users, setUsers] = useState([]);
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

  const deleteDriver = async (id) => {
    axios({
      method: "delete",
      url: `${URLst}organization_users/${id}`,
    })
      .then((res) => {
        setUsers(users.filter((e) => e.id != id));
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

  const column = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "",
      dataIndex: "",
      render: (data, rec) => (
        <Button
          type="primary"
          danger
          onClick={() => {
            deleteDriver(rec.id);
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

  useEffect(() => {
    getDrivers();
  }, []);
  return (
    <Layout>
      <div className="text-right my-2">
        <Button
          type="primary"
          onClick={() => {
            Router.push("drivers/create");
          }}
          icon={<PiPlus />}
        >
          Add User
        </Button>
      </div>
      <Table
        columns={column}
        dataSource={users}
        className="overflow-auto"
        scroll={{ x: 400 }}
      />
    </Layout>
  );
};

export default Users;
