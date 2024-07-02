import styles from "./page.module.css";

export default function DiaryLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.diary__wrap}>
      {children}
    </div>
  )
}