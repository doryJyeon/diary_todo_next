"use client";

import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from "./page.module.css";

const HomeTitle = () => {
  const pathname = usePathname();
  const [title, setTitle] = useState("");

  useEffect(() => {
    pathname === "/" && setTitle("To-do list");
    pathname === "/diary" && setTitle("일기장");
  }, [pathname]);

  return (
    <h1 className={styles.title}>
      {title}
    </h1>
  );
}

export default HomeTitle;
