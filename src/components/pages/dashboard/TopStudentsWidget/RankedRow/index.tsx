import React from "react";
import { TopStudentDto } from "@/services/api/dashboard/get-top-students";
import styles from "../TopStudentsWidget.module.css";

const MAX_SCORE = 30;

interface RankedRowProps {
  student: TopStudentDto;
}

export function RankedRow({ student }: RankedRowProps) {
  const pct = (student.tongKhoiA / MAX_SCORE) * 100;
  return (
    <div className={styles.rankedItem} style={{ animationDelay: `${student.rank * 0.07}s` }}>
      <span className={styles.rankedRank}>#{student.rank}</span>

      <div className={styles.rankedInfo}>
        <div className={styles.rankedTop}>
          <span className={styles.rankedSbdLabel}>SBD</span>
          <span className={styles.rankedSbd}>{student.sbd}</span>
        </div>
        <div className={styles.rankedScores}>
          <span className={styles.rankedSubScore}>Toán <b>{student.toan}</b></span>
          <span className={styles.rankedDot}>·</span>
          <span className={styles.rankedSubScore}>Lý <b>{student.vatLi}</b></span>
          <span className={styles.rankedDot}>·</span>
          <span className={styles.rankedSubScore}>Hóa <b>{student.hoaHoc}</b></span>
        </div>
      </div>

      <div className={styles.rankedRight}>
        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{ width: `${pct}%`, animationDelay: `${student.rank * 0.07}s` }}
          />
        </div>
        <span className={styles.rankedTotal}>{student.tongKhoiA.toFixed(2)}</span>
      </div>
    </div>
  );
}
