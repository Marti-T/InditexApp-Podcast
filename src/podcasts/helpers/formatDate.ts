
export function formatDate(dateString: string): string {
  const date: Date = new Date(dateString);
  const day: number = date.getDate();
  const month: number = date.getMonth() + 1;
  const year: number = date.getFullYear();

  const formatDay: string = day < 10 ? `0${day}` : day.toString();
  const formatMonth: string = month < 10 ? `0${month}` : month.toString();

  return `${formatDay}-${formatMonth}-${year}`;
}
