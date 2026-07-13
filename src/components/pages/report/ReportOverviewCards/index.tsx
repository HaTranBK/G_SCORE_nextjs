import React from "react";
import { Card } from "antd";
import { UserOutlined, RiseOutlined, FireOutlined } from "@ant-design/icons";
import { SubjectReportItem } from "../types";

interface ReportOverviewCardsProps {
  totalCandidates: number;
  subjects: SubjectReportItem[];
}

export function ReportOverviewCards({ totalCandidates, subjects }: ReportOverviewCardsProps) {
  const formatNum = (num: number) => new Intl.NumberFormat().format(num);

  const highestPerf = subjects.reduce((prev, current) => {
    return prev.average > current.average ? prev : current;
  }, subjects[0]);

  const mostPopulated = subjects.reduce((prev, current) => {
    return prev.total > current.total ? prev : current;
  }, subjects[0]);

  return (
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
  );
}
