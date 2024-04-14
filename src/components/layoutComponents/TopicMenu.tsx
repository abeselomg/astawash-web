import React from "react";
import { FunctionComponent } from "react";
import { Menu, Row, Avatar, Col, Popover, Popconfirm, Divider } from "antd";
import Router from "next/router";
import {
  MenuOutlined,
  LogoutOutlined,
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { primary_color } from "../../../utils/constants";
import { JSXElement } from "@babel/types";
interface MenuItem {
  name: string;
  link: string;
  icon: JSXElement;
}
export default function TopicMenu({
  items,
  selectedKey,
  changeSelectedKey,
}: any) {
  const styledTopics: Array<any> = [];

  items.forEach((topic: any, index: number) => {
    topic.children !== undefined
      ? styledTopics.push(
          <Menu.SubMenu key={index} icon={topic.icon} title={topic.name}>
            {topic.children.map((e: MenuItem, i: number) => {
              return (
                <Menu.Item
                  style={{
                    paddingLeft: "5px",
                  }}
                  key={100 + i}
                  l={e.link}
                  onClick={(ev) => {
                    changeSelectedKey(ev, e.link);
                  }}
                >
                  {e.name}{" "}
                </Menu.Item>
              );
            })}
          </Menu.SubMenu>
        )
      : styledTopics.push(
          <Menu.Item
            style={{
              paddingLeft: "5px",
            }}
            key={index}
            l={topic.link}
            onClick={(e) => {
              changeSelectedKey(e);
            }}
            icon={topic.icon}
          >
            {topic.name}{" "}
          </Menu.Item>
        );
  });

  return (
    <>
      <h6 className="ml-2 font-bold">Menu</h6>
      <Menu
        selectedKeys={[selectedKey]}
        defaultSelectedKeys={["0"]}
        theme="light"
        mode="inline"
      >
        {styledTopics}{" "}
      </Menu>
    </>
  );
}
