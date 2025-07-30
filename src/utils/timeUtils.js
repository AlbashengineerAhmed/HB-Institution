/**
 * Converts 24-hour format time to 12-hour format with AM/PM
 * @param {number} hour - Hour in 24-hour format (0-23)
 * @returns {string} - Time in 12-hour format with AM/PM
 */
export const convertTo12Hour = (hour) => {
  if (hour === 0) {
    return '12:00 AM';
  } else if (hour < 12) {
    return `${hour}:00 AM`;
  } else if (hour === 12) {
    return '12:00 PM';
  } else {
    return `${hour - 12}:00 PM`;
  }
};

/**
 * Converts time range from 24-hour format to 12-hour format
 * @param {number} from - Start hour in 24-hour format
 * @param {number} to - End hour in 24-hour format
 * @returns {string} - Time range in 12-hour format
 */
export const convertTimeRange = (from, to) => {
  const fromTime = convertTo12Hour(from);
  const toTime = convertTo12Hour(to);
  return `${fromTime} - ${toTime}`;
};

/**
 * Formats instructor availability object to display in 12-hour format
 * @param {Object} availableTime - Object with day keys and {from, to} values
 * @returns {Object} - Formatted availability with 12-hour times
 */
export const formatInstructorAvailability = (availableTime) => {
  if (!availableTime || typeof availableTime !== 'object') {
    return {};
  }

  const formatted = {};
  Object.entries(availableTime).forEach(([day, timeData]) => {
    if (timeData && typeof timeData.from === 'number' && typeof timeData.to === 'number') {
      formatted[day] = {
        ...timeData,
        displayTime: convertTimeRange(timeData.from, timeData.to),
        from12Hour: convertTo12Hour(timeData.from),
        to12Hour: convertTo12Hour(timeData.to)
      };
    }
  });

  return formatted;
};