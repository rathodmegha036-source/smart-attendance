export function getAttendanceStatus(startTime) {
  const now = Date.now();
  const start = new Date(startTime).getTime();

  const diffMinutes = (now - start) / 60000;

  if (diffMinutes <= 5) return 'Present';
  if (diffMinutes <= 10) return 'Late';

  return null; // Not allowed
}