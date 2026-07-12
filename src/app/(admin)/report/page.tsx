"use client";

import React from "react";
import { Card, Table, Tag } from "antd";

interface ReportItem {
  key: string;
  subject: string;
  average: number;
  highest: number;
  status: string;
}

export default function ReportPage() {
  const columns = [
    { title: "Subject", dataIndex: "subject", key: "subject" },
    { title: "Average Score", dataIndex: "average", key: "average" },
    { title: "Highest Score", dataIndex: "highest", key: "highest" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "Completed" ? "green" : "volcano"}>{status}</Tag>
      ),
    },
  ];

  const data: ReportItem[] = [
    { key: "1", subject: "Math", average: 6.85, highest: 10, status: "Completed" },
    { key: "2", subject: "Literature", average: 6.2, highest: 9.5, status: "Completed" },
    { key: "3", subject: "English", average: 5.75, highest: 10, status: "Completed" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Analysis Reports</h1>
      <Card
        title="Subject Performance Summary"
        bordered={false}
        className="shadow-xs border border-gray-100"
      >
        <div className="overflow-x-auto w-full">
          <Table columns={columns} dataSource={data} pagination={false} />
        </div>
      </Card>
    </div>
  );
}
