import axios from "axios";
import { APP_CONFIG } from "@/configs";
import { HTTP_HEADER_KEY, HTTP_HEADER_VALUE } from "@/types/http";

const httpClientTS = axios.create({
  baseURL: APP_CONFIG.API_BASE_URL_TS,
  timeout: 60000,
  headers: {
    [HTTP_HEADER_KEY.CONTENT_TYPE]: HTTP_HEADER_VALUE.APPLICATION_JSON,
  },
});

export async function getHttpClientTS() {
  return httpClientTS;
}
