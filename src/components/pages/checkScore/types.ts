export interface StudentScoreResponse {
  sbd: string;
  toan: number | null;
  ngu_van: number | null;
  ngoai_ngu: number | null;
  vat_li: number | null;
  hoa_hoc: number | null;
  sinh_hoc: number | null;
  lich_su: number | null;
  dia_li: number | null;
  gdcd: number | null;
  ma_ngoai_ngu: string | null;
}

export const subjectLabels: Record<keyof Omit<StudentScoreResponse, "sbd" | "ma_ngoai_ngu">, string> = {
  toan: "Mathematics",
  ngu_van: "Literature",
  ngoai_ngu: "Foreign Language",
  vat_li: "Physics",
  hoa_hoc: "Chemistry",
  sinh_hoc: "Biology",
  lich_su: "History",
  dia_li: "Geography",
  gdcd: "Civic Education",
};
