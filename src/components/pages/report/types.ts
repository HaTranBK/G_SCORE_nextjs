export interface SubjectScoreLevels {
  level1: number;
  level2: number;
  level3: number;
  level4: number;
}

export interface SubjectReportItem {
  subjectCode: string;
  subjectName: string;
  total: number;
  average: number;
  max: number;
  levels: SubjectScoreLevels;
}

export interface ReportResponse {
  totalCandidates: number;
  subjects: SubjectReportItem[];
}
