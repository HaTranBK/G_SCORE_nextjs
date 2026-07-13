"use client";

import React, { useState } from "react";
import { Card, Segmented } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { SubjectReportItem } from "../types";

interface ChartTabsProps {
  subjects: SubjectReportItem[];
}

export default function ChartTabs({ subjects }: ChartTabsProps) {
  const [chartType, setChartType] = useState<"grouped" | "stacked">("grouped");

  // Transform data for charts
  const chartData = subjects.map((sub) => {
    const l1 = sub.levels.level1;
    const l2 = sub.levels.level2;
    const l3 = sub.levels.level3;
    const l4 = sub.levels.level4;
    const total = sub.total || 1;

    return {
      name: sub.subjectName,
      // Absolute counts
      "Giỏi (Excellent)": l1,
      "Khá (Good)": l2,
      "Trung bình (Average)": l3,
      "Yếu (Poor)": l4,
      // Percentage distributions
      "Giỏi %": Number(((l1 / total) * 100).toFixed(2)),
      "Khá %": Number(((l2 / total) * 100).toFixed(2)),
      "Trung bình %": Number(((l3 / total) * 100).toFixed(2)),
      "Yếu %": Number(((l4 / total) * 100).toFixed(2)),
      // Extra details for tooltips
      raw: { l1, l2, l3, l4, total: sub.total },
    };
  });

  const levelColors = {
    level1: "#6366f1", // Indigo
    level2: "#0d9488", // Teal
    level3: "#f59e0b", // Amber
    level4: "#f43f5e", // Rose
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const { l1, l2, l3, l4, total } = data.raw;

      const formatNum = (num: number) => new Intl.NumberFormat().format(num);

      return (
        <div className="bg-slate-900/95 border border-slate-700/80 backdrop-blur-md p-4 rounded-xl text-white shadow-2xl">
          <p className="font-bold text-base mb-2 border-b border-slate-700 pb-1 text-indigo-300">
            {label}
          </p>
          <div className="space-y-1.5 text-sm">
            <div className="flex items-center justify-between gap-6">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: levelColors.level1 }} />
                <span>Giỏi (Excellent):</span>
              </span>
              <span className="font-semibold">
                {formatNum(l1)} <span className="text-slate-400 text-xs">({((l1 / total) * 100).toFixed(2)}%)</span>
              </span>
            </div>
            <div className="flex items-center justify-between gap-6">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: levelColors.level2 }} />
                <span>Khá (Good):</span>
              </span>
              <span className="font-semibold">
                {formatNum(l2)} <span className="text-slate-400 text-xs">({((l2 / total) * 100).toFixed(2)}%)</span>
              </span>
            </div>
            <div className="flex items-center justify-between gap-6">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: levelColors.level3 }} />
                <span>Trung bình (Average):</span>
              </span>
              <span className="font-semibold">
                {formatNum(l3)} <span className="text-slate-400 text-xs">({((l3 / total) * 100).toFixed(2)}%)</span>
              </span>
            </div>
            <div className="flex items-center justify-between gap-6">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: levelColors.level4 }} />
                <span>Yếu (Poor):</span>
              </span>
              <span className="font-semibold">
                {formatNum(l4)} <span className="text-slate-400 text-xs">({((l4 / total) * 100).toFixed(2)}%)</span>
              </span>
            </div>
            <div className="border-t border-slate-700 pt-1.5 mt-2 flex justify-between font-bold text-slate-300">
              <span>Tổng số thí sinh:</span>
              <span>{formatNum(total)}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card
      bordered={false}
      className="shadow-xl rounded-2xl border border-slate-100/80 bg-white/95 backdrop-blur-md"
      title={
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-1">
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              Phân Tích & So Sánh Phổ Điểm Các Môn
            </h3>
            <p className="text-xs text-slate-400 font-normal mt-0.5">
              So sánh tương quan phân bố 4 mức điểm của 9 môn học chính
            </p>
          </div>
          <Segmented
            options={[
              { label: "Số lượng (Cột nhóm)", value: "grouped" },
              { label: "Tỷ lệ % (Cột chồng)", value: "stacked" },
            ]}
            value={chartType}
            onChange={(val) => setChartType(val as "grouped" | "stacked")}
            className="bg-slate-100 p-0.5 rounded-lg border border-slate-200"
          />
        </div>
      }
    >
      <div className="w-full h-[420px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            barGap={4}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="name"
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) =>
                chartType === "stacked"
                  ? `${val}%`
                  : val >= 1000000
                  ? `${(val / 1000000).toFixed(1)}M`
                  : val >= 1000
                  ? `${val / 1000}k`
                  : val
              }
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(226, 232, 240, 0.4)" }} />
            <Legend
              verticalAlign="top"
              height={36}
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span className="text-slate-600 text-sm font-medium">{value}</span>
              )}
            />
            {chartType === "grouped" ? (
              <>
                <Bar
                  dataKey="Giỏi (Excellent)"
                  fill={levelColors.level1}
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
                <Bar
                  dataKey="Khá (Good)"
                  fill={levelColors.level2}
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
                <Bar
                  dataKey="Trung bình (Average)"
                  fill={levelColors.level3}
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
                <Bar
                  dataKey="Yếu (Poor)"
                  fill={levelColors.level4}
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
              </>
            ) : (
              <>
                <Bar
                  dataKey="Giỏi %"
                  name="Giỏi (Excellent)"
                  stackId="a"
                  fill={levelColors.level1}
                  radius={[0, 0, 0, 0]}
                  maxBarSize={45}
                />
                <Bar
                  dataKey="Khá %"
                  name="Khá (Good)"
                  stackId="a"
                  fill={levelColors.level2}
                  radius={[0, 0, 0, 0]}
                  maxBarSize={45}
                />
                <Bar
                  dataKey="Trung bình %"
                  name="Trung bình (Average)"
                  stackId="a"
                  fill={levelColors.level3}
                  radius={[0, 0, 0, 0]}
                  maxBarSize={45}
                />
                <Bar
                  dataKey="Yếu %"
                  name="Yếu (Poor)"
                  stackId="a"
                  fill={levelColors.level4}
                  radius={[4, 4, 0, 0]}
                  maxBarSize={45}
                />
              </>
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
