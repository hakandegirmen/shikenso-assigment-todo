import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  /**
   * Combines a date and time into a single Date object
   * Example: date: "2024-03-20" + time: "14:30" = "2024-03-20 14:30"
   */
  combineDateTime(date: Date | null, time: string | null): Date | null {
    // If no date is provided, we can't create a datetime
    if (!date) {
      return null;
    }

    // If time is provided, add it to the date
    if (time) {
      // Create a copy of the date to avoid modifying the original
      const dateWithTime = new Date(date);

      // Split time string "14:30" into hours and minutes
      const [hours, minutes] = time.split(':');

      // Set the hours and minutes on our date
      dateWithTime.setHours(
        Number(hours), // Convert "14" to 14
        Number(minutes) // Convert "30" to 30
      );

      return dateWithTime;
    }

    // If no time provided, return just the date
    return date;
  }

  /**
   * Extracts time from a Date object in "HH:mm" format
   * Example: Date("2024-03-20 14:30") => "14:30"
   */
  getTimeString(date: Date | null): string {
    if (!date) {
      return '';
    }

    const hours = String(date.getHours()).padStart(2, '0'); // "14"
    const minutes = String(date.getMinutes()).padStart(2, '0'); // "30"

    return `${hours}:${minutes}`; // "14:30"
  }

  /**
   * Formats a date for display in a user-friendly way
   * Example: Date("2024-03-20") => "March 20, 2024"
   */
  formatForDisplay(date: Date | null): string {
    if (!date) {
      return '';
    }

    const dateObj = new Date(date);
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const month = monthNames[dateObj.getMonth()];
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();

    return `${month} ${day}, ${year}`;
  }

  /**
   * Converts a Date object to API-friendly string format
   */
  toApiString(date: Date | null): string | null {
    return date ? date.toISOString() : null;
  }

  // Convert API date string to Date object
  toDate(dateString: string | null | undefined): Date | undefined {
    if (!dateString) return undefined;

    // Create date object and adjust for local timezone
    const date = new Date(dateString);
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() + userTimezoneOffset);
  }
}
