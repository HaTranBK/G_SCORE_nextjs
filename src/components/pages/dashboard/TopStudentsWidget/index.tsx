"use client";

import React from "react";
import { Skeleton, Alert } from "antd";
import { TrophyOutlined } from "@ant-design/icons";
import { useGetTopStudents } from "../hooks/useGetTopStudents";
import { PodiumCard } from "./PodiumCard";
import { RankedRow } from "./RankedRow";
import styles from "./TopStudentsWidget.module.css";

export default function TopStudentsWidget() {
  const { data, isLoading, isError, error } = useGetTopStudents(10);

  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <TrophyOutlined className={styles.headerIcon} />
          <span className={styles.headerTitle}>Top 10 Khối A</span>
          <span className={styles.headerBadge}>Toán · Lý · Hóa</span>
        </div>
        <Skeleton active paragraph={{ rows: 10 }} />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className={styles.wrapper}>
        <Alert
          type="error"
          message="Không thể tải dữ liệu Top 10 Khối A"
          description={error?.message}
          showIcon
        />
      </div>
    );
  }

  // Podium hiển thị theo thứ tự hạng [2, 1, 3] từ trái qua phải
  const podiumOrder = [data[1], data[0], data[2]];
  const restStudents = data.slice(3);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <TrophyOutlined className={styles.headerIcon} />
        <span className={styles.headerTitle}>Top 10 Khối A</span>
        <span className={styles.headerBadge}>Toán · Lý · Hóa</span>
      </div>

      <div className={styles.body}>
        <div className={styles.podiumSection}>
          <p className={styles.sectionLabel}>🏆 Top 3</p>
          <div className={styles.podiumRow}>
            {podiumOrder.map((s) => (
              <PodiumCard key={s.sbd} student={s} />
            ))}
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.rankedSection}>
          <p className={styles.sectionLabel}>📋 Hạng 4 – 10</p>
          <div className={styles.rankedList}>
            {restStudents.map((s) => (
              <RankedRow key={s.sbd} student={s} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

