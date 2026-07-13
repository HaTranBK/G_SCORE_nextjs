import React from "react";
import { Button } from "antd";
import { SyncOutlined } from "@ant-design/icons";

interface ReportHeaderProps {
  isSyncing: boolean;
  syncData: () => void;
}

export function ReportHeader({ isSyncing, syncData }: ReportHeaderProps) {
  return (
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
        onClick={syncData}
        className="border-slate-200 hover:border-indigo-600 hover:text-indigo-600 h-10 px-5 rounded-lg font-semibold flex items-center gap-2 shadow-xs transition-all"
      >
        Đồng bộ Cache Database
      </Button>
    </div>
  );
}
