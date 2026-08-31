export function formatDuration(seconds: number): string {
  const boundedSeconds = Math.max(0, seconds);
  const minutes = Math.floor(boundedSeconds / 60);
  const remainingSeconds = boundedSeconds % 60;

  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const restMinutes = minutes % 60;
    return `${hours}j ${restMinutes}m`;
  }

  return `${minutes}m ${remainingSeconds}s`;
}
