import React from "react";
import { Button, Result } from "antd";

interface ReportErrorProps {
  error: Error | null;
}

export function ReportError({ error }: ReportErrorProps) {
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
