"use client";

import { usePathname } from 'next/navigation';
import React from 'react';
import styles from "./SideMenu.module.css";
import { SideMenuItems } from "./../data/SideMenuItems";
import SideMenuItem from './SideMenuItem';
import SideMenuReg from '../utils/SideMenuReg';

const SideMenu = () => {
  const pathname = usePathname();
  const newPathname = SideMenuReg(pathname);

  const MenuItems = SideMenuItems[(newPathname === "/" ? "todo" : newPathname)];

  return (
    <aside className={styles.menu__wrap}>
      {MenuItems && Object.entries(MenuItems).map(([key, value]) => (
        <SideMenuItem
          title={value.title}
          link={value.link}
          icon={value.icon}
          color={value.color}
          modal={value.modal && value.modal}
          buttonAction={value.buttonAction && value.buttonAction}
          key={key}
        />
      ))}
    </aside>
  );
}

export default SideMenu;
