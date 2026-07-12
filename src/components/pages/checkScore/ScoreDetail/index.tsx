import React from "react";
import { Card, Spin, Alert, Row, Col, Statistic } from "antd";
import { StudentScoreResponse, subjectLabels } from "../types";

interface ScoreDetailProps {
  searchSbd: string | null;
  data?: StudentScoreResponse;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export default function ScoreDetail({
  searchSbd,
  data,
  isLoading,
  isError,
  error,
}: ScoreDetailProps) {
  // Lọc lấy các môn học có điểm (không phải null)
  const validScores = data
    ? Object.entries(subjectLabels)
        .map(([key, label]) => ({
          label,
          score: data[key as keyof StudentScoreResponse],
        }))
        .filter((item): item is { label: string; score: number } => item.score !== null)
    : [];

  return (
    <Card bordered={false} className="shadow-xs border border-gray-100 min-h-[180px]">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Detailed Scores</h2>

      {!searchSbd && (
        <div className="text-gray-500 text-base py-4">
          Detailed view of search scores here!
        </div>
      )}

      {searchSbd && isLoading && (
        <div className="flex justify-center items-center py-8">
          <Spin size="large" tip="Searching candidate scores..." />
        </div>
      )}

      {searchSbd && isError && (
        <div className="py-2">
          <Alert
            message="Error Lookup"
            description={error?.message || "Something went wrong while searching. Please try again."}
            type="error"
            showIcon
            className="rounded-md"
          />
        </div>
      )}

      {searchSbd && !isLoading && !isError && data && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <p className="text-gray-500 text-sm uppercase tracking-wide">Candidate ID</p>
              <h3 className="text-xl font-bold text-gray-900">SBD: {data.sbd}</h3>
            </div>
            {data.ma_ngoai_ngu && (
              <div className="text-right">
                <p className="text-gray-500 text-sm uppercase tracking-wide">Language Group</p>
                <span className="inline-block bg-indigo-50 text-indigo-700 text-sm font-semibold px-3 py-1 rounded-full border border-indigo-100">
                  {data.ma_ngoai_ngu}
                </span>
              </div>
            )}
          </div>

          {validScores.length === 0 ? (
            <p className="text-gray-500 py-4">No exam scores available for this candidate.</p>
          ) : (
            <Row gutter={[16, 16]}>
              {validScores.map((item, idx) => (
                <Col xs={12} sm={8} md={6} key={idx}>
                  <Card
                    bordered={false}
                    className="bg-zinc-50 border border-zinc-100 rounded-lg shadow-xs hover:border-zinc-200 transition-all text-center h-32 flex flex-col justify-center"
                    styles={{
                      body: {
                        padding: "12px",
                      },
                    }}
                  >
                    <Statistic
                      title={<span className="text-gray-500 text-sm font-medium">{item.label}</span>}
                      value={item.score}
                      precision={2}
                      valueStyle={{
                        color: item.score >= 8.0 ? "#10b981" : item.score >= 5.0 ? "#4f46e5" : "#ef4444",
                        fontWeight: "bold",
                        fontSize: "1.75rem",
                      }}
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
      )}
    </Card>
  );
}
