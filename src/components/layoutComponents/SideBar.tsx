import React from "react";
import { Layout } from "antd";
export default function SideBar({ menu, onBreakpoint }:any) {
  return (
    <Layout.Sider
      style={{
        overflow: "auto",
        left: 0,
        top: 0,
        bottom: 0,
      }}
      breakpoint={"lg"}
      theme="light"
      collapsedWidth={0}
      trigger={null}
      onBreakpoint={(broken) => {
        onBreakpoint(broken);
      }}
    >
      {menu}
    </Layout.Sider>
  );
}
