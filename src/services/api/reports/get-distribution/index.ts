import { getHttpClientTS } from "@/helpers/httpClientHelperTS";
import { ReportResponse } from "@/components/pages/report/types";

const API_URL = "/reports/score-distribution";

export const getScoreDistribution = async (): Promise<ReportResponse> => {
  const httpClientTS = await getHttpClientTS();
  const resp = await httpClientTS.get(API_URL);
  return resp.data.data;
};
