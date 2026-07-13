"use client";

import React, { useState } from "react";
import { Card, Table, Button, Input } from "antd";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import { SubjectReportItem } from "../types";

interface ReportTableProps {
  subjects: SubjectReportItem[];
}

export default function ReportTable({ subjects }: ReportTableProps) {
  const [searchText, setSearchText] = useState("");

  const formatNum = (num: number) => new Intl.NumberFormat().format(num);

  const filteredData = subjects.filter((sub) =>
    sub.subjectName.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Môn học",
      dataIndex: "subjectName",
      key: "subjectName",
      render: (text: string) => <span className="font-semibold text-slate-800">{text}</span>,
    },
    {
      title: "Tổng số thí sinh",
      dataIndex: "total",
      key: "total",
      sorter: (a: SubjectReportItem, b: SubjectReportItem) => a.total - b.total,
      render: (val: number) => formatNum(val),
    },
    {
      title: "Điểm TB",
      dataIndex: "average",
      key: "average",
      sorter: (a: SubjectReportItem, b: SubjectReportItem) => a.average - b.average,
      render: (val: number) => <span className="font-semibold text-slate-700">{val}</span>,
    },
    {
      title: "Điểm cao nhất",
      dataIndex: "max",
      key: "max",
      sorter: (a: SubjectReportItem, b: SubjectReportItem) => a.max - b.max,
      render: (val: number) => <span className="font-bold text-indigo-600">{val}</span>,
    },
    {
      title: "Giỏi (>= 8.0)",
      dataIndex: ["levels", "level1"],
      key: "level1",
      sorter: (a: SubjectReportItem, b: SubjectReportItem) => a.levels.level1 - b.levels.level1,
      render: (val: number, record: SubjectReportItem) => (
        <span>
          {formatNum(val)}{" "}
          <span className="text-slate-400 text-xs">
            ({((val / (record.total || 1)) * 100).toFixed(1)}%)
          </span>
        </span>
      ),
    },
    {
      title: "Khá (6.5 - 8.0)",
      dataIndex: ["levels", "level2"],
      key: "level2",
      sorter: (a: SubjectReportItem, b: SubjectReportItem) => a.levels.level2 - b.levels.level2,
      render: (val: number, record: SubjectReportItem) => (
        <span>
          {formatNum(val)}{" "}
          <span className="text-slate-400 text-xs">
            ({((val / (record.total || 1)) * 100).toFixed(1)}%)
          </span>
        </span>
      ),
    },
    {
      title: "Trung bình (5.0 - 6.5)",
      dataIndex: ["levels", "level3"],
      key: "level3",
      sorter: (a: SubjectReportItem, b: SubjectReportItem) => a.levels.level3 - b.levels.level3,
      render: (val: number, record: SubjectReportItem) => (
        <span>
          {formatNum(val)}{" "}
          <span className="text-slate-400 text-xs">
            ({((val / (record.total || 1)) * 100).toFixed(1)}%)
          </span>
        </span>
      ),
    },
    {
      title: "Yếu (< 5.0)",
      dataIndex: ["levels", "level4"],
      key: "level4",
      sorter: (a: SubjectReportItem, b: SubjectReportItem) => a.levels.level4 - b.levels.level4,
      render: (val: number, record: SubjectReportItem) => (
        <span>
          {formatNum(val)}{" "}
          <span className="text-slate-400 text-xs">
            ({((val / (record.total || 1)) * 100).toFixed(1)}%)
          </span>
        </span>
      ),
    },
  ];

  const handleExportCSV = () => {
    const headers = [
      "Môn học",
      "Tổng thí sinh",
      "Điểm trung bình",
      "Điểm cao nhất",
      "Giỏi (Excellent)",
      "Khá (Good)",
      "Trung bình (Average)",
      "Yếu (Poor)",
    ];

    const rows = subjects.map((sub) => [
      `"${sub.subjectName}"`,
      sub.total,
      sub.average,
      sub.max,
      sub.levels.level1,
      sub.levels.level2,
      sub.levels.level3,
      sub.levels.level4,
    ]);

    // Use BOM \uFEFF to preserve Vietnamese character encodings in Excel
    const csvContent =
      "\uFEFF" +
      [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `bao_cao_diem_thi_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card
      bordered={false}
      className="shadow-xl rounded-2xl border border-slate-100/80 bg-white/95 backdrop-blur-md"
      title={
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-1">
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              Bảng Số Liệu Chi Tiết
            </h3>
            <p className="text-xs text-slate-400 font-normal mt-0.5">
              Tra cứu, sắp xếp và tải báo cáo phổ điểm các môn học
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Input
              placeholder="Tìm kiếm môn học..."
              prefix={<SearchOutlined className="text-slate-400" />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-52 h-9"
              allowClear
            />
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={handleExportCSV}
              className="bg-indigo-600 hover:bg-indigo-700 border-none h-9 rounded-lg text-white font-medium flex items-center gap-1.5"
            >
              Xuất CSV
            </Button>
          </div>
        </div>
      }
    >
      <div className="overflow-x-auto w-full">
        <Table
          columns={columns}
          dataSource={filteredData.map((item) => ({ ...item, key: item.subjectCode }))}
          pagination={false}
          className="border-none"
          rowClassName="hover:bg-slate-50/50 transition-colors"
        />
      </div>
    </Card>
  );
}
