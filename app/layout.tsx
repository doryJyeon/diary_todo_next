import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import HomeTitle from "./Home/HomeTitle";
import SideMenu from "./SideMenu/SideMenu";

const notoSansKR = Noto_Sans_KR({ subsets: ["latin"], weight: ["400", "500", "600", "800"] });

export const metadata: Metadata = {
  title: "Diary & To Do List",
  description: "일기장, 그리고 할 일",
  icons: {
    icon: "/images/favicon.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={notoSansKR.className}>
        <HomeTitle />
        <section className="content__wrap">
          <article className="content__body">
            <div className="content__item">
              {children}
            </div>
          </article>

          <SideMenu />
        </section>
      </body>
    </html>
  );
}
