import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getScoreDistribution } from "@/services/api/reports/get-distribution";
import { clearReportsCache } from "@/services/api/reports/clear-cache";
import { ReportResponse } from "../types";
import { message } from "antd";

export function useGetReportDistribution() {
  const queryClient = useQueryClient();

  const query = useQuery<ReportResponse, Error>({
    queryKey: ["scoreDistribution"],
    queryFn: getScoreDistribution,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });

  const mutation = useMutation({
    mutationFn: clearReportsCache,
    onSuccess: () => {
      message.success("Đã đồng bộ và xóa cache Redis thành công!");
      queryClient.invalidateQueries({ queryKey: ["scoreDistribution"] });
    },
    onError: (err) => {
      message.error("Lỗi khi đồng bộ dữ liệu: " + err.message);
    },
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    isSyncing: mutation.isPending,
    syncData: mutation.mutate,
    refetch: query.refetch,
  };
}
