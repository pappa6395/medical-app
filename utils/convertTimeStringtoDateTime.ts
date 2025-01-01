
export function convertTimeStringToDateTime(dateString: any ,timeString: any) {
    // Get the current date
    const currentDate = new Date(dateString);
  
    // Use a regex to parse the time and AM/PM
    const timeMatch = timeString.match(/(\d{1,2}):(\d{2})\s?(AM|PM)/i);
    if (!timeMatch) {
      throw new Error("Invalid time string format");
    }
  
    let [_, hours, minutes, period] = timeMatch; // Destructure matches
    hours = parseInt(hours, 10);
    minutes = parseInt(minutes, 10);
  
    // Convert to 24-hour format if PM
    if (period.toUpperCase() === "PM" && hours !== 12) {
      hours += 12;
    }
    // Handle 12 AM (midnight)
    if (period.toUpperCase() === "AM" && hours === 12) {
      hours = 0;
    }
  
    // Set hours and minutes on the current date
    currentDate.setHours(hours, minutes, 0, 0); // Set seconds and milliseconds to 0
  
    return currentDate;
  }