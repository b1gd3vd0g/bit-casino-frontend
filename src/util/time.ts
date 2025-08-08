export interface Duration {
  hours: number;
  minutes: number;
  seconds: number;
}

export function timeTillNewUtcDay() {
  const now = new Date();
  const rem = {
    hours: 24 - now.getUTCHours(),
    minutes: 60 - now.getUTCMinutes(),
    seconds: 60 - now.getUTCSeconds()
  };
  return rem.seconds + rem.minutes * 60 + rem.hours * 3_600;
}
