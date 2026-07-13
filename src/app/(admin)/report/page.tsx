"use client";

import React from "react";
import { Tabs } from "antd";
import { useGetReportDistribution } from "@/components/pages/report/hooks/useGetReportDistribution";
import ChartTabs from "@/components/pages/report/ChartTabs";
import SubjectDetails from "@/components/pages/report/SubjectDetails";
import ReportTable from "@/components/pages/report/ReportTable";
import { ReportHeader } from "@/components/pages/report/ReportHeader";
import { ReportOverviewCards } from "@/components/pages/report/ReportOverviewCards";
import { ReportLoading } from "@/components/pages/report/ReportLoading";
import { ReportError } from "@/components/pages/report/ReportError";

export default function ReportPage() {
  const { data, isLoading, isError, error, isSyncing, syncData } =
    useGetReportDistribution();

  if (isLoading) {
    return <ReportLoading />;
  }

  if (isError || !data) {
    return <ReportError error={error} />;
  }

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
      <ReportHeader isSyncing={isSyncing} syncData={syncData} />

      <ReportOverviewCards totalCandidates={data.totalCandidates} subjects={data.subjects} />

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
