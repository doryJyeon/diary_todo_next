"use client";

import React from 'react';
import styles from "./Todo.module.css";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckOutlined } from '@ant-design/icons';

interface Props {
  loading?: boolean
}

const TodoFilter = ({ loading }: Props) => {
  const params = useSearchParams();
  const type = loading ? null : params.get("type");

  const links = [
    { href: '/', label: '전체', type: null },
    { href: '/?type=not', label: '미완료', type: 'not' },
    { href: '/?type=done', label: '완료', type: 'done' },
  ];

  return (
    <menu className={styles.todo__filter}>
      {links.map((link) => (
        <Link key={link.type} href={link.href} className={type === link.type ? styles.active : ''}>
          {type === link.type && <CheckOutlined />}
          {link.label}
        </Link>
      ))}
    </menu>
  );
}

export default TodoFilter;
