import React, { useEffect, useState } from "react";
import { Button, Layout, Menu, theme, Image } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
const { Header, Content, Footer } = Layout;
import { ImLab } from "react-icons/im";
import { SiBandlab } from "react-icons/si";
import { PiJarLabelFill } from "react-icons/pi";
import { FaHome } from "react-icons/fa";

const items = [
  {
    key: "/home",
    icon: <FaHome size={20} />,
    label: <NavLink to="/home">Home</NavLink>,
  },
  {
    key: "/lab1",
    icon: <ImLab size={20} />,
    label: <NavLink to="/lab1">Lab1</NavLink>,
  },
  {
    key: "/lab2",
    icon: <SiBandlab size={20} />,
    label: <NavLink to="/lab2">Lab2</NavLink>,
  },
  {
    key: "/lab3",
    icon: <PiJarLabelFill size={20} />,
    label: <NavLink to="/lab3">Lab3</NavLink>,
  },
];

const Sidebar = () => {
  const [path, setPath] = useState(window.location.pathname);
  const [collapsed, setCollapsed] = useState(false);
  const onMenu = (e) => {
    setPath(e.key);
    if (window.innerWidth <= 768) setCollapsed(true);
  };

  useEffect(() => {
    setPath(window.location.pathname.split("/")[1]);
  }, []);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      {!collapsed && (
        <div className="abs-bg" onClick={() => setCollapsed(true)}></div>
      )}
      <Sider
        style={{
          scrollbarWidth: "thin",
          scrollbarGutter: "stable",
        }}
        collapsedWidth="0"
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="sider"
      >
        <img
          src="./src/assets/logo.png"
          style={{
            width: "100%",
            padding: "10px",
          }}
        />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[path]}
          items={items}
          onClick={onMenu}
          className="menu"
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "50px",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          ©{new Date().getFullYear()}(chopish taqiqlanadi)
          <div
            style={{
              marginRight: "20px",
            }}
          >
            <Image
              src="./src/assets/fak.png"
              style={{
                width: "45px",
              }}
            />
          </div>
        </Header>
        <Content
          style={{
            margin: "5px",
            padding: 10,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: "auto",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Sidebar;
