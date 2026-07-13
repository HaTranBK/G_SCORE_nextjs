import { getHttpClientTS } from "@/helpers/httpClientHelperTS";

const API_URL = "/reports/clear-cache";

export const clearReportsCache = async (): Promise<{ message: string }> => {
  const httpClientTS = await getHttpClientTS();
  const resp = await httpClientTS.post(API_URL);
  return resp.data;
};
