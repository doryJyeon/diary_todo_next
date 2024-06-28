"use client";

import { usePathname } from 'next/navigation';
import React from 'react';
import styles from "./SideMenu.module.css";
import { SideMenuItems } from "./../data/SideMenuItems";
import SideMenuItem from './SideMenuItem';

const SideMenu = () => {
  const pathname = usePathname();
  const MenuItems = SideMenuItems[(pathname === "/" ? "todo" : "diary")];

  return (
    <aside className={styles.menu__wrap}>
      {Object.entries(MenuItems).map(([key, value]) => (
        <SideMenuItem
          title={value.title}
          link={value.link}
          icon={value.icon}
          color={value.color}
          modal={value.modal && value.modal}
          key={key}
        />
      ))}
    </aside>
  );
}

export default SideMenu;
