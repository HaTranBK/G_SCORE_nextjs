import React from "react";
import { Spin } from "antd";

export function ReportLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] gap-4">
      <Spin size="large" className="text-indigo-600" />
      <p className="text-slate-500 font-medium animate-pulse">
        Đang tính toán phổ điểm thi trên 1 triệu hồ sơ học sinh...
      </p>
    </div>
  );
}
