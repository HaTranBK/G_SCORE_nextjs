import { getHttpClientTS } from "@/helpers/httpClientHelperTS";
import { StudentScoreResponse } from "@/components/pages/checkScore/types";

const API_URL = "/students";

export const getStudentScoreDetail = async (
  sbd: string,
): Promise<StudentScoreResponse> => {
  const httpClientTS = await getHttpClientTS();
  const resp = await httpClientTS.get(`${API_URL}/${sbd}`);
  return resp.data.data;
};

