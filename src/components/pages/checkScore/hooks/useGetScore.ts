import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { useRouterParams } from "./useRouterParams";
import { StudentScoreResponse } from "../types";
import { getStudentScoreDetail } from "@/services/api/students/get-detail";

export function useGetScore() {
  const { sbd } = useRouterParams();

  const searchParams = useMemo(() => {
    return {
      sbd: sbd || null,
    };
  }, [sbd]);

  const queryFn = useCallback(() => {
    if (!searchParams.sbd) {
      return Promise.reject(new Error("No registration number provided"));
    }
    return getStudentScoreDetail(searchParams.sbd);
  }, [searchParams.sbd]);

  const { data, isLoading, isError, error } = useQuery<StudentScoreResponse, Error>({
    queryKey: ["studentScore", searchParams],
    queryFn: queryFn,
    enabled: !!searchParams.sbd,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 5000,
  });

  return {
    data,
    isLoading,
    isError,
    error,
    searchParams,
  };
}
