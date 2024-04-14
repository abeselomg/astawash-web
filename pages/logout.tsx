import { Spin } from "antd";
import Router from "next/router";
import React, { useEffect } from "react";

function Logout() {
  useEffect(() => {
    localStorage.clear();
    Router.push("/");
  }, []);

  return <div className="flex justify-center items-center">
    <Spin size="large"/>
  </div>;
}

export default Logout;
