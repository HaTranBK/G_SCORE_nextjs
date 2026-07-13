import React from "react";
import styles from "../TopStudentsWidget.module.css";

interface ScoreTagProps {
  label: string;
  value: number;
}

export function ScoreTag({ label, value }: ScoreTagProps) {
  return (
    <span className={styles.scoreTag}>
      <span className={styles.scoreTagLabel}>{label}</span>
      <span className={styles.scoreTagValue}>{value}</span>
    </span>
  );
}
