"use client";

import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from "./../page.module.css";
import Image from "next/image";
import LogoImg from "/public/images/logos/logo.png";

const HomeTitle = () => {
  const pathname = usePathname();
  const [title, setTitle] = useState("");

  useEffect(() => {
    pathname === "/" && setTitle("To-do list");
    pathname === "/diary" && setTitle("일기장");
  }, [pathname]);

  return (
    <h1 className={styles.title}>
      <Image src={LogoImg} alt={'logo'} />
      {title}
    </h1>
  );
}

export default HomeTitle;
