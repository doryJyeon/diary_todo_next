const nowDate = new Date();



/**
 * yyyymmdd 현재 일자 반환
*/
const getFullDate = () => {
  const monthFormat = nowDate.getMonth() + 1 < 10 ? `0${nowDate.getMonth() + 1}` : nowDate.getMonth() + 1
  const dayFormat = nowDate.getDate() < 10 ? `0${nowDate.getDate()}` : nowDate.getDate()

  return `${nowDate.getFullYear()}${monthFormat}${dayFormat}`
}
export const fullDate = getFullDate();

/**
 * yyyy.mm.dd로 변환
 * @param {string} fullDate 20240608
 */
export const fullDateFormat = (fullDate: string) => (
  fullDate.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1.$2.$3')
)

