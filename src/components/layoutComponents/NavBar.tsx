import React, { useState } from "react";
import {
  Button,
  Col,
  Drawer,
  Row,
  Layout,
  Popover,
  Avatar,
  Divider,
} from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { FaAngleDown, FaUser } from "react-icons/fa6";
import { PiUserCircleLight } from "react-icons/pi";

import { useRouter } from "next/router";

import useWindowSize from "../../../utils/windowsSize";

interface MenuInterface {
  menu: JSX.Element;
}
function NavBar({ menu }: MenuInterface) {
  const [visible, setVisible] = useState(false);

  const { width } = useWindowSize();

  const { push } = useRouter();
  return (
    <Layout.Header
      style={{
        backgroundColor: "#fff",
        padding: 0,
      }}
    >
      <Row style={{ paddingRight: "20px" }} justify="space-between">
        <Col>
          <Button
            style={width > 992 ? { display: "none" } : {}}
            icon={<MenuOutlined />}
            onClick={() => setVisible(true)}
          />
          <Drawer
            bodyStyle={{
              padding: "0",
            }}
            headerStyle={{
              paddingLeft: "2rem",
              paddingTop: "1rem",
              paddingBottom: "1rem",
            }}
            closable={false}
            placement="left"
            onClick={() => setVisible(false)}
            onClose={() => setVisible(false)}
            visible={visible}
          >
            <>
              <img
                src="/astawash_logo.png"
                style={{ height: "100%", maxHeight: "50px", width: "auto" }}
              />
              <Divider />
              {menu}
            </>
          </Drawer>

          <img
            src="/astawash_logo.png"
            style={
              width > 992
                ? { height: "100%", maxHeight: "50px", width: "auto" }
                : { display: "none" }
            }
          />
          {/* </div> */}
        </Col>
        <Col>
          <div>
            <Row align="middle">
              <span className="avatar-item">
                {
                  <Avatar
                    shape="circle"
                    size="default"
                    // style={{ backgroundColor: primary_color }}
                    icon={<PiUserCircleLight />}
                  />
                }
              </span>
              <Col>
                {" "}
                <div
                  style={{
                    paddingLeft: "10px",
                    paddingTop: "5px",
                    paddingRight: "5px",
                    color: "black",
                    fontSize: 14,
                    fontWeight: 600,
                    width: "100px",
                    overflow: "hidden",
                    position: "relative",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {typeof window !== "undefined"
                    ? window.localStorage.getItem("orgName")
                    : ""}
                </div>
              </Col>

              <Popover
                placement="bottomRight"
                content={
                  <div>
                    <Row
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        push("/profile");
                      }}
                    >
                      <FaUser style={{ marginTop: "4px" }} />
                      <p className="ml-2 text-md">Profile</p>
                    </Row>
                  </div>
                }
                trigger="hover"
              >
                <FaAngleDown style={{ marginLeft: "8px" }} />
              </Popover>
            </Row>
          </div>
        </Col>
      </Row>
    </Layout.Header>
  );
}

export default NavBar;
