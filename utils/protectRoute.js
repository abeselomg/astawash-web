/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../layout";
import { adminmenu, fileroommenu, officemenu } from "../layout/menuLinks";
import { useTranslations } from "next-intl";
import Link from "next/link";

function WithAuth(WrappedComponent) {

  return (props) => {
    const [wind, setwind] = useState(false);
    useEffect(() => {
      setwind(true);
    }, []);
    if (wind) {
      const role = localStorage.getItem("type");
      const Router = useRouter();
      // const accessToken = true;
      const accessToken = localStorage.getItem("token");

      if (role === "ADMIN") {
        if (adminmenu.some((e) => e.link == Router.pathname)) {
          let i = adminmenu.findIndex((element) => {
            return element.link === Router.pathname;
          });
          localStorage.setItem("selectedKey", i.toString());
        } else {
          localStorage.setItem("selectedKey", null);
        }
      } else if (role === "FILE-ROOM") {
        if (fileroommenu.some((e) => e.link == Router.pathname)) {
          let i = fileroommenu.findIndex((element) => {
            return element.link === Router.pathname;
          });
          localStorage.setItem("selectedKey", i.toString());
        } else {
          localStorage.setItem("selectedKey", null);
        }
      } else {
        if (officemenu.some((e) => e.link == Router.pathname)) {
          let i = officemenu.findIndex((element) => {
            return element.link === Router.pathname;
          });
          localStorage.setItem("selectedKey", i.toString());
        } else {
          localStorage.setItem("selectedKey", null);
        }
      }

      if (!accessToken) {
        Router.replace("/login");
        return null;
      }

      if (
        Router.pathname == "/login" ||
        Router.pathname == "/forgot-password" ||
        Router.pathname == "/reset-password" ||
        Router.pathname == "/"
      ) {
        return <WrappedComponent {...props} />;
      } else {
        return (
          <Layout>
            <WrappedComponent {...props} />
          </Layout>
        );
      }
    }

    return null;
  };
}

export default WithAuth;


export async function getStaticProps(context) {
  return {
    props: {
      // You can get the messages from anywhere you like. The recommended
      // pattern is to put them in JSON files separated by locale and read
      // the desired one based on the `locale` received from Next.js.
      messages: (await import(`../messages/${context.locale}.json`)).default
    }
  };
}
