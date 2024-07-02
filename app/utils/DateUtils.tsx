/**
 * yyyymmdd 현재 일자 반환
*/
export const getFullDate = (addDay = 0) => {
  const today = new Date();
  today.setDate(today.getDate() + addDay);
  const monthFormat = today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1
  const dayFormat = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate()

  return `${today.getFullYear()}${monthFormat}${dayFormat}`
}
export const fullDate = getFullDate();

/**
 * yyyy.mm.dd로 변환
 * @param {string} fullDate 20240608
 */
export const fullDateFormat = (fullDate: string) => (
  fullDate.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1.$2.$3')
)

