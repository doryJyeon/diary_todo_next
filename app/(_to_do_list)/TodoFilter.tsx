"use client";

import React from 'react';
import styles from "./Todo.module.css";
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { CheckOutlined } from '@ant-design/icons';

const TodoFilter = () => {
  const { type = "all" } = useParams();

  const links = [
    { href: '/', label: '전체', type: 'all' },
    { href: '/?type=not', label: '미완료', type: 'not' },
    { href: '/?type=done', label: '완료', type: 'done' },
  ];

  return (
    <menu className={styles.todo__filter}>
      {links.map((link) => (
        <Link key={link.type} href={link.href} className={type === link.type ? 'active' : ''}>
          {type === link.type && <CheckOutlined />}
          {link.label}
        </Link>
      ))}
    </menu>
  );
}

export default TodoFilter;
