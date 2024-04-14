
import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { Layout } from "antd";
import TopicMenu from "../components/layoutComponents/TopicMenu";
import NavBar from "../components/layoutComponents/NavBar";
import SideBar from "../components/layoutComponents/SideBar";
import { adminmenu } from "./menuLinks";
import { connect } from "react-redux";

export function Indexlayout(props: any) {
  const router = useRouter();

  const items = adminmenu.map((e) => {
    return { ...e, name: e.name };
  });

  const [contentIndex, setContentIndex] = useState(0);
  
  const [selectedKey, setSelectedKey] = useState<string>(typeof window !== 'undefined' ? window.localStorage.getItem('selectedKey') : '0');
  const [breakpointBool, setBreakpointBool] = useState(false);

  const changeSelectedKey = (event: any, path = null) => {
    localStorage.setItem("selectedKey", event.key);
    const key = event.key;
    setSelectedKey(key);
    setContentIndex(+key);
    path === null ? router.push(items[key].link) : router.push(path);
  };
  const Menu = (
    <TopicMenu
      items={items}
      selectedKey={selectedKey}
      changeSelectedKey={changeSelectedKey}
    />
  );
  return (
    <div>
      <Layout className="flex flex-col min-h-screen">
        <NavBar menu={Menu} />
        <Layout className="flex-grow">
          <SideBar
            menu={Menu}
            onBreakpoint={(broken: any) => {
              setBreakpointBool(broken);
            }}
            theme="dark"
          />
          <Layout
            style={
              {
                // padding: "0 24px 24px",
              }
            }
          >
            <Layout.Content
              style={
                breakpointBool
                  ? {
                      padding: "48px 40px 0",
                      height: "100 vh",
                      backgroundColor: "#E7E7FF",
                    }
                  : {
                      padding: "48px 40px 0",
                      overflow: "initial",
                      height: "100 vh",
                      backgroundColor: "#E7E7FF",
                    }
              }
            >
              {props.children}
            </Layout.Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}

export default Indexlayout;
