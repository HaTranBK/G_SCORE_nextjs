"use client";

import React, { useState, useEffect } from "react";
import { Layout, Menu, Button, theme, Avatar, Space, Drawer } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  CheckSquareOutlined,
  BarChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useRouter, usePathname } from "next/navigation";

const { Header, Sider, Content } = Layout;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 991.98px)");
    
    const handleBreakpoint = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
      if (e.matches) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleBreakpoint(mediaQuery);
    mediaQuery.addEventListener("change", handleBreakpoint);
    return () => mediaQuery.removeEventListener("change", handleBreakpoint);
  }, []);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Định nghĩa các tab menu ở Sidebar
  const menuItems = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "/check-score",
      icon: <CheckSquareOutlined />,
      label: "Check Score",
    },
    {
      key: "/report",
      icon: <BarChartOutlined />,
      label: "Report",
    },
  ];

  // Hàm xử lý khi click chuyển Tab
  const handleMenuClick = (e: { key: string }) => {
    router.push(e.key);
    // Tự động đóng Drawer trên thiết bị di động sau khi chọn menu
    if (isMobile) {
      setCollapsed(true);
    }
  };

  // Render phần Menu dùng chung cho cả Sider và Drawer
  const renderMenuContent = () => (
    <>
      <div className="flex h-16 items-center justify-center border-b border-gray-100 px-4 font-bold text-lg text-indigo-600 transition-all">
        {collapsed && !isMobile ? "G" : "G-SCORE ADMIN"}
      </div>
      <Menu
        mode="inline"
        selectedKeys={[pathname]}
        items={menuItems}
        onClick={handleMenuClick}
        className="border-none mt-2"
      />
    </>
  );

  return (
    <Layout className="min-h-screen">
      {/* 1. SIDEBAR DÀNH CHO DESKTOP */}
      {!isMobile && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          theme="light"
          className="shadow-md"
        >
          {renderMenuContent()}
        </Sider>
      )}

      {/* 2. DRAWER OVERLAY DÀNH CHO MOBILE */}
      {isMobile && (
        <Drawer
          placement="left"
          closable={false}
          onClose={() => setCollapsed(true)}
          open={!collapsed} // Mở drawer khi trạng thái collapsed là false
          width={240}
          styles={{ body: { padding: 0 } }}
        >
          {renderMenuContent()}
        </Drawer>
      )}

      {/* KHU VỰC BÊN PHẢI (HEADER & CONTENT) */}
      <Layout>
        {/* HEADER */}
        <Header
          style={{ background: colorBgContainer }}
          className="flex h-16 items-center justify-between pl-2 pr-4 sm:pl-3 sm:pr-6 shadow-xs border-b border-gray-100"
        >
          {/* Nút collapse sidebar / toggle drawer */}
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="text-lg w-10 h-10 flex items-center justify-center -ml-1"
          />

          {/* Thông tin Admin (Không cần auth logic) */}
          <Space size="middle">
            <span className="text-gray-600 font-medium">Hello, Admin</span>
            <Avatar icon={<UserOutlined />} className="bg-indigo-500" />
          </Space>
        </Header>

        {/* CONTENT CHỨA PAGE */}
        <Content
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            minHeight: 280,
          }}
          className="m-4 sm:m-6 p-4 sm:p-6 shadow-sm overflow-auto"
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

