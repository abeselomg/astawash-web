import React, { useEffect } from "react";
import { Container } from "@components";
import { Button, Empty, Spin } from "antd";
import Login from "./Login";
import Layout from "../src/Layout/index";
import { useRouter } from "next/router";
import { AiOutlineLoading } from "react-icons/ai";

const Home: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    } else {
      router.push("/Login");
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
    <Spin size="large"/>
  </div>
  );
};

export default Home;
