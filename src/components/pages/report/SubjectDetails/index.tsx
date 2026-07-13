"use client";

import React, { useState } from "react";
import { Card, Select, Progress } from "antd";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { SubjectReportItem } from "../types";
import { TrophyOutlined, BarChartOutlined } from "@ant-design/icons";

interface SubjectDetailsProps {
  subjects: SubjectReportItem[];
}

export default function SubjectDetails({ subjects }: SubjectDetailsProps) {
  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string>(
    subjects[0]?.subjectCode || "toan"
  );

  const activeSubject = subjects.find(
    (s) => s.subjectCode === selectedSubjectCode
  ) || subjects[0];

  if (!activeSubject) return null;

  const { levels, total, average, max } = activeSubject;

  const levelColors = [
    { name: "Giỏi (Excellent)", value: levels.level1, color: "#6366f1" },
    { name: "Khá (Good)", value: levels.level2, color: "#0d9488" },
    { name: "Trung bình (Average)", value: levels.level3, color: "#f59e0b" },
    { name: "Yếu (Poor)", value: levels.level4, color: "#f43f5e" },
  ];

  const formatNum = (num: number) => new Intl.NumberFormat().format(num);

  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const pct = ((data.value / total) * 100).toFixed(2);
      return (
        <div className="bg-slate-900/95 border border-slate-700/80 backdrop-blur-md p-3 rounded-lg text-white shadow-xl text-xs">
          <p className="font-bold mb-1" style={{ color: data.payload.color }}>
            {data.name}
          </p>
          <p>
            Thí sinh: <span className="font-semibold">{formatNum(data.value)}</span>
          </p>
          <p>
            Tỷ lệ: <span className="font-semibold">{pct}%</span>
          </p>
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
              Chi Tiết Phân Phối Theo Môn Học
            </h3>
            <p className="text-xs text-slate-400 font-normal mt-0.5">
              Phân tích chuyên sâu mức điểm và hiệu năng của từng môn
            </p>
          </div>
          <Select
            value={selectedSubjectCode}
            onChange={(val) => setSelectedSubjectCode(val)}
            className="w-48 h-9 text-slate-700 font-medium"
            options={subjects.map((sub) => ({
              label: sub.subjectName,
              value: sub.subjectCode,
            }))}
          />
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-2">
        {/* Left Side: Pie Chart */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          <div className="w-[280px] h-[280px] flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={levelColors}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {levelColors.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text of Donut */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Tổng thí sinh
              </span>
              <span className="text-2xl font-black text-slate-800 mt-0.5">
                {formatNum(total)}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Detailed Metrics & Progress bars */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Subject Stat Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50/60 border border-slate-100 p-4 rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 text-lg">
                <BarChartOutlined />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-normal">Điểm trung bình</p>
                <p className="text-xl font-bold text-slate-800">{average}</p>
              </div>
            </div>
            <div className="bg-slate-50/60 border border-slate-100 p-4 rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 text-lg">
                <TrophyOutlined />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-normal">Điểm cao nhất</p>
                <p className="text-xl font-bold text-slate-800">{max}</p>
              </div>
            </div>
          </div>

          {/* Level Distribution Lists with Progress Bars */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Phân phối xếp hạng học lực
            </h4>
            <div className="space-y-3.5">
              {levelColors.map((lvl, index) => {
                const percentage = total > 0 ? (lvl.value / total) * 100 : 0;
                return (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-slate-600 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: lvl.color }} />
                        {lvl.name}
                      </span>
                      <span className="text-slate-800 font-semibold">
                        {formatNum(lvl.value)}{" "}
                        <span className="text-slate-400 font-normal text-xs ml-1">
                          ({percentage.toFixed(2)}%)
                        </span>
                      </span>
                    </div>
                    <Progress
                      percent={percentage}
                      showInfo={false}
                      strokeColor={lvl.color}
                      trailColor="#f1f5f9"
                      strokeWidth={6}
                      className="m-0"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
