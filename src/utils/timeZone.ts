import { useState, useEffect } from 'react';

export const USA_TIMEZONE = 'America/Chicago'; // Austin, TX / US Central Time
export const USA_TIMEZONE_LABEL = 'US Central Time (CT / Austin, TX)';

export interface AustinTimeInfo {
  currentTimeFormatted: string;
  timeZoneAbbr: string;
  timeZoneFull: string;
  isOpen: boolean;
  isClosingSoon: boolean;
  statusBadgeText: string;
  shortStatusText: string;
  hoursDetailText: string;
  currentDayName: string;
  currentHour24: number;
  currentMinute: number;
}

export function getAustinTimeInfo(): AustinTimeInfo {
  const now = new Date();

  // Extract date parts in America/Chicago
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone: USA_TIMEZONE,
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
    weekday: 'long',
    timeZoneName: 'short',
  });

  const parts = dtf.formatToParts(now);
  let hour24 = 0;
  let minute = 0;
  let weekday = '';
  let timeZoneAbbr = 'CT';

  for (const part of parts) {
    if (part.type === 'hour') hour24 = parseInt(part.value, 10);
    if (part.type === 'minute') minute = parseInt(part.value, 10);
    if (part.type === 'weekday') weekday = part.value;
    if (part.type === 'timeZoneName') timeZoneAbbr = part.value;
  }

  // Convert to 12h formatted time
  const timeFormatter12h = new Intl.DateTimeFormat('en-US', {
    timeZone: USA_TIMEZONE,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  const currentTimeFormatted = timeFormatter12h.format(now);

  // Business hours: 10:00 AM (10) to 10:00 PM (22)
  const isOpen = hour24 >= 10 && hour24 < 22;
  const isClosingSoon = hour24 === 21; // Between 9:00 PM and 9:59 PM

  let statusBadgeText = '';
  let shortStatusText = '';

  if (isOpen) {
    if (isClosingSoon) {
      statusBadgeText = `Open Now • Closes at 10:00 PM ${timeZoneAbbr}`;
      shortStatusText = `Closing Soon (10:00 PM ${timeZoneAbbr})`;
    } else {
      statusBadgeText = `Open Now • Closes at 10:00 PM ${timeZoneAbbr}`;
      shortStatusText = `Open Now Till 10:00 PM ${timeZoneAbbr}`;
    }
  } else {
    if (hour24 < 10) {
      statusBadgeText = `Closed Now • Opens Today at 10:00 AM ${timeZoneAbbr}`;
      shortStatusText = `Opens at 10:00 AM ${timeZoneAbbr}`;
    } else {
      statusBadgeText = `Closed for the Night • Opens Tomorrow at 10:00 AM ${timeZoneAbbr}`;
      shortStatusText = `Opens 10:00 AM ${timeZoneAbbr}`;
    }
  }

  return {
    currentTimeFormatted,
    timeZoneAbbr,
    timeZoneFull: USA_TIMEZONE_LABEL,
    isOpen,
    isClosingSoon,
    statusBadgeText,
    shortStatusText,
    hoursDetailText: `10:00 AM - 10:00 PM ${timeZoneAbbr} (Daily)`,
    currentDayName: weekday,
    currentHour24: hour24,
    currentMinute: minute,
  };
}

/**
 * React hook to keep the USA / Austin, TX time synchronized live
 */
export function useAustinTime(): AustinTimeInfo {
  const [timeInfo, setTimeInfo] = useState<AustinTimeInfo>(getAustinTimeInfo);

  useEffect(() => {
    // Initial sync
    setTimeInfo(getAustinTimeInfo());

    // Update every 10 seconds
    const interval = setInterval(() => {
      setTimeInfo(getAustinTimeInfo());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return timeInfo;
}
