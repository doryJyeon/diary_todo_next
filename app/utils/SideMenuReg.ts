const SideMenuReg = (pathname: string) => {
  let newPathname = pathname;

  // 일기장 인데 생성이 아닌 경우 중
  if (pathname.search(/\/diary\/+/i) === 0 && pathname !== "/diary/create") {
    // 수정은 아닌경우 >> read
    if (pathname.search(/\/diary\/update/i) === -1) newPathname = "/diary/read";
    // 수정인 경우
    if (pathname.search(/\/diary\/update/i) === 0) newPathname = "/diary/update";
  }

  return newPathname;
}

export default SideMenuReg;
