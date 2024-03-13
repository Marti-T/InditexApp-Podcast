

export function formatDurationTrack(trackTimeMillis: number): string {
  const date = new Date(trackTimeMillis);

  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  const formatHours = hours < 10 ? `0${hours}` : hours;
  const formatMinuts = minutes < 10 ? `0${minutes}` : minutes;

  return `${formatHours}:${formatMinuts}`;
}