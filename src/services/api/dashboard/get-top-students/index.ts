import { getHttpClientTS } from "@/helpers/httpClientHelperTS";

export interface TopStudentDto {
  rank: number;
  sbd: string;
  toan: number;
  vatLi: number;
  hoaHoc: number;
  tongKhoiA: number;
}

const API_URL = "/dashboard/top-students";

export const getTopStudents = async (
  limit = 10
): Promise<TopStudentDto[]> => {
  const httpClientTS = await getHttpClientTS();
  const resp = await httpClientTS.get(API_URL, { params: { limit } });
  return resp.data.data;
};
