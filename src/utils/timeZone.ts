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
  try {
    const now = new Date();

    // Extract date parts in America/Chicago
    const dtf = new Intl.DateTimeFormat('en-US', {
      timeZone: USA_TIMEZONE,
      hour: 'numeric',
      minute: '2-digit',
      hourCycle: 'h23',
      weekday: 'long',
      timeZoneName: 'short',
    });

    const parts = dtf.formatToParts(now);
    let hour24 = 12;
    let minute = 0;
    let weekday = 'Monday';
    let timeZoneAbbr = 'CT';

    for (const part of parts) {
      if (part.type === 'hour') {
        const val = parseInt(part.value, 10);
        hour24 = isNaN(val) ? 12 : val % 24;
      }
      if (part.type === 'minute') {
        const val = parseInt(part.value, 10);
        minute = isNaN(val) ? 0 : val;
      }
      if (part.type === 'weekday') weekday = part.value || 'Today';
      if (part.type === 'timeZoneName') timeZoneAbbr = part.value || 'CT';
    }

    // Convert to 12h formatted time
    let currentTimeFormatted = '12:00 PM';
    try {
      const timeFormatter12h = new Intl.DateTimeFormat('en-US', {
        timeZone: USA_TIMEZONE,
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
      currentTimeFormatted = timeFormatter12h.format(now);
    } catch {
      currentTimeFormatted = `${((hour24 % 12) || 12)}:${minute.toString().padStart(2, '0')} ${hour24 >= 12 ? 'PM' : 'AM'}`;
    }

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
  } catch (err) {
    console.warn('Timezone calculation fallback:', err);
    return {
      currentTimeFormatted: 'Open Daily',
      timeZoneAbbr: 'CT',
      timeZoneFull: USA_TIMEZONE_LABEL,
      isOpen: true,
      isClosingSoon: false,
      statusBadgeText: 'Open Daily • 10:00 AM - 10:00 PM CT',
      shortStatusText: 'Open Daily 10 AM - 10 PM CT',
      hoursDetailText: '10:00 AM - 10:00 PM CT (Daily)',
      currentDayName: 'Today',
      currentHour24: 12,
      currentMinute: 0,
    };
  }
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
