import React, { useEffect, useState } from "react";
import { Button, Layout, Menu, theme, Image } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
const { Header, Content, Footer } = Layout;
import { FaHome } from "react-icons/fa";
import { GiMineWagon } from "react-icons/gi";
import { BsTrainLightrailFrontFill } from "react-icons/bs";
import { GoContainer } from "react-icons/go";
import { BsMinecartLoaded } from "react-icons/bs";
import { BsTrainFreightFrontFill } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";
import logo from "../assets/log.png";
import icon from "../assets/icon.png";

const items = [
  {
    key: "/",
    icon: <FaHome size={20} />,
    label: <NavLink to="/">Home</NavLink>,
  },
  {
    key: "/lab1",
    icon: <BsTrainLightrailFrontFill size={20} />,
    label: <NavLink to="/lab1">Station</NavLink>,
  },
  {
    key: "/lab2",
    icon: <GiMineWagon size={20} />,
    label: <NavLink to="/lab2">Wagon</NavLink>,
  },
  {
    key: "/lab3",
    icon: <GoContainer size={20} />,
    label: <NavLink to="/lab3">Container</NavLink>,
  },
  {
    key: "/lab4",
    icon: <BsMinecartLoaded size={20} />,
    label: <NavLink to="/lab4">Load code</NavLink>,
  },
  {
    key: "/lab5",
    icon: <BsTrainFreightFrontFill size={20} />,
    label: <NavLink to="/lab5">Station class</NavLink>,
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
      {!collapsed && window.innerWidth <= 768 && (
        <Button
          onClick={() => setCollapsed(true)}
          className="close-btn"
          icon={<IoIosCloseCircle size={20} />}
        />
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
          src={logo}
          style={{
            width: "100%",
            padding: "15px",
            borderBottom: "1px solid lightgrey",
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
              width: 50,
              height: 50,
            }}
          />
          ©{new Date().getFullYear()}(chopish taqiqlanadi)
          <div
            style={{
              marginRight: "20px",
            }}
          >
            <Image
              src={icon}
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
