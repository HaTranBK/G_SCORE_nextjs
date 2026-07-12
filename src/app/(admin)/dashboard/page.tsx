"use client";

import React from "react";
import { Card, Col, Row, Statistic } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card bordered={false} className="shadow-xs border border-gray-100">
            <Statistic
              title="Total Candidates"
              value={112893}
              precision={0}
              valueStyle={{ color: "#10b981" }}
              prefix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card bordered={false} className="shadow-xs border border-gray-100">
            <Statistic
              title="Graded Exam Papers"
              value={92809}
              precision={0}
              valueStyle={{ color: "#10b981" }}
              prefix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card bordered={false} className="shadow-xs border border-gray-100">
            <Statistic
              title="Pending Reviews"
              value={93}
              precision={0}
              valueStyle={{ color: "#ef4444" }}
              prefix={<ArrowDownOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
