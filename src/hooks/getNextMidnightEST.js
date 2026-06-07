export function getNextMidnightEST() {
  const now = new Date();
  const est = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  const midnight = new Date(est);
  midnight.setHours(24, 0, 0, 0);
  return new Date(midnight.toLocaleString('en-US', { timeZone: 'America/New_York' }));
}