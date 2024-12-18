
 export const formattedDate = (bookDate: Date | undefined): string => {
    
    if (!bookDate) return "No date selected";

    const dateString = bookDate.toString();

    const dateFormat = `${dateString
        .split(" ")
        .slice(0, 3)
        .join(" ")
    } - GMT${dateString
        .split("GMT")[1]
        .split(" ")[0]}`;

    return dateFormat
 }

export const getFormattedDate = () => {
    const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthOfYear = [
        "Jan", "Feb", "Mar",
         "Apr", "May", "Jun",
          "Jul", "Aug", "Sep",
           "Oct", "Nov", "Dec"
        ];
    const today = new Date();
    const dayName = dayOfWeek[today.getDay()];
    const monthName = monthOfYear[today.getMonth()];
    const day = today.getDate();

    return `${dayName}, ${monthName} ${day}`;
}

