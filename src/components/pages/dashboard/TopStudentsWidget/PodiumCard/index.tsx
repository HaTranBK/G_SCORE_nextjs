import React from "react";
import { TopStudentDto } from "@/services/api/dashboard/get-top-students";
import { ScoreTag } from "../ScoreTag";
import styles from "../TopStudentsWidget.module.css";

const MAX_SCORE = 30;

const PODIUM_CONFIG: Record<number, { emoji: string; height: number; glowColor: string }> = {
  1: { emoji: "🥇", height: 120, glowColor: "rgba(251,191,36,0.4)" },
  2: { emoji: "🥈", height: 88, glowColor: "rgba(148,163,184,0.35)" },
  3: { emoji: "🥉", height: 68, glowColor: "rgba(205,127,50,0.35)" },
};

interface PodiumCardProps {
  student: TopStudentDto;
}

export function PodiumCard({ student }: PodiumCardProps) {
  const cfg = PODIUM_CONFIG[student.rank];
  return (
    <div
      className={styles.podiumCard}
      style={{ animationDelay: `${(student.rank - 1) * 0.15}s` }}
    >
      <div className={styles.podiumMedal}>{cfg.emoji}</div>

      <div className={styles.podiumSbdLabel}>SBD</div>
      <div className={styles.podiumSbd}>{student.sbd}</div>

      <div className={styles.podiumTotal}>{student.tongKhoiA.toFixed(2)}</div>
      <div className={styles.podiumMaxLabel}>/ {MAX_SCORE}</div>

      <div className={styles.podiumScores}>
        <ScoreTag label="Toán" value={student.toan} />
        <ScoreTag label="Lý" value={student.vatLi} />
        <ScoreTag label="Hóa" value={student.hoaHoc} />
      </div>

      <div
        className={styles.podiumBar}
        style={{
          height: cfg.height,
          boxShadow: `0 0 20px ${cfg.glowColor}`,
        }}
      >
        <span className={styles.podiumRankLabel}>#{student.rank}</span>
      </div>
    </div>

  );
}
