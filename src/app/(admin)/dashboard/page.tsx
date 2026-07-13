"use client";

import React from "react";
import { Row, Col } from "antd";
import TopStudentsWidget from "@/components/pages/dashboard/TopStudentsWidget";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <TopStudentsWidget />
        </Col>
      </Row>
    </div>
  );
}

