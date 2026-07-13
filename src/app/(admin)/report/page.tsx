"use client";

import React from "react";
import { Tabs, Button, Card, Spin, Result } from "antd";
import { SyncOutlined, UserOutlined, RiseOutlined, FireOutlined } from "@ant-design/icons";
import { useGetReportDistribution } from "@/components/pages/report/hooks/useGetReportDistribution";
import ChartTabs from "@/components/pages/report/ChartTabs";
import SubjectDetails from "@/components/pages/report/SubjectDetails";
import ReportTable from "@/components/pages/report/ReportTable";

export default function ReportPage() {
  const { data, isLoading, isError, error, isSyncing, syncData } =
    useGetReportDistribution();

  const formatNum = (num: number) => new Intl.NumberFormat().format(num);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] gap-4">
        <Spin size="large" className="text-indigo-600" />
        <p className="text-slate-500 font-medium animate-pulse">
          Đang tính toán phổ điểm thi trên 1 triệu hồ sơ học sinh...
        </p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <Result
          status="error"
          title="Lấy dữ liệu thống kê thất bại"
          subTitle={error?.message || "Đã xảy ra lỗi không xác định khi kết nối với server."}
          extra={[
            <Button type="primary" key="retry" onClick={() => window.location.reload()}>
              Thử lại
            </Button>,
          ]}
        />
      </div>
    );
  }

  // Calculate dynamic metrics
  const totalCandidates = data.totalCandidates;
  
  const highestPerf = data.subjects.reduce((prev, current) => {
    return prev.average > current.average ? prev : current;
  }, data.subjects[0]);

  const mostPopulated = data.subjects.reduce((prev, current) => {
    return prev.total > current.total ? prev : current;
  }, data.subjects[0]);

  const tabItems = [
    {
      key: "charts",
      label: "Biểu đồ so sánh",
      children: <ChartTabs subjects={data.subjects} />,
    },
    {
      key: "details",
      label: "Chi tiết môn học",
      children: <SubjectDetails subjects={data.subjects} />,
    },
    {
      key: "table",
      label: "Bảng dữ liệu chi tiết",
      children: <ReportTable subjects={data.subjects} />,
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Thống Kê Phổ Điểm Quốc Gia
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Báo cáo phân phối điểm số và thứ hạng của thí sinh trên dữ liệu thực tế
          </p>
        </div>
        <Button
          type="default"
          icon={<SyncOutlined spin={isSyncing} />}
          loading={isSyncing}
          onClick={() => syncData()}
          className="border-slate-200 hover:border-indigo-600 hover:text-indigo-600 h-10 px-5 rounded-lg font-semibold flex items-center gap-2 shadow-xs transition-all"
        >
          Đồng bộ Cache Database
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Candidates */}
        <Card
          bordered={false}
          className="shadow-md rounded-2xl bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 border border-indigo-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-indigo-600/80 font-bold uppercase tracking-wider">
                Tổng Số Thí Sinh
              </p>
              <h2 className="text-3xl font-black text-indigo-950 mt-1">
                {formatNum(totalCandidates)}
              </h2>
              <p className="text-xs text-slate-400 mt-1 font-normal">
                Toàn quốc đăng ký dự thi
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-indigo-500 text-white flex items-center justify-center text-xl shadow-lg shadow-indigo-500/30">
              <UserOutlined />
            </div>
          </div>
        </Card>

        {/* Highest Performing Subject */}
        <Card
          bordered={false}
          className="shadow-md rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-emerald-600/80 font-bold uppercase tracking-wider">
                Môn Học Điểm Cao Nhất
              </p>
              <h2 className="text-3xl font-black text-emerald-950 mt-1">
                {highestPerf ? highestPerf.subjectName : "N/A"}
              </h2>
              <p className="text-xs text-emerald-600 mt-1 font-medium">
                Điểm trung bình: {highestPerf ? highestPerf.average : "0"}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-xl shadow-lg shadow-emerald-500/30">
              <RiseOutlined />
            </div>
          </div>
        </Card>

        {/* Most Populated Subject */}
        <Card
          bordered={false}
          className="shadow-md rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-amber-600/80 font-bold uppercase tracking-wider">
                Môn Đăng Ký Nhiều Nhất
              </p>
              <h2 className="text-3xl font-black text-amber-950 mt-1">
                {mostPopulated ? mostPopulated.subjectName : "N/A"}
              </h2>
              <p className="text-xs text-amber-600 mt-1 font-medium">
                {formatNum(mostPopulated ? mostPopulated.total : 0)} thí sinh
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center text-xl shadow-lg shadow-amber-500/30">
              <FireOutlined />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Tabs Dashboard */}
      <div className="bg-slate-50/40 border border-slate-100 rounded-3xl p-4 sm:p-6 shadow-sm">
        <Tabs
          defaultActiveKey="charts"
          items={tabItems}
          className="report-dashboard-tabs"
          size="large"
        />
      </div>
    </div>
  );
}
