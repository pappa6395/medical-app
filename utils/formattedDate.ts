
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

export function formatCreatedDate(createdDate: Date | undefined): string {
    const day = createdDate?.getDate()?? undefined;
    const month = createdDate?.toLocaleString('default', { month: 'long' })?? undefined;
    const year = createdDate?.getFullYear()?? undefined;

    const daySuffix = (day: number | undefined): string => {
        if (day && day >= 11 && day <= 13) return "th";
        switch (day && day % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    };

    return `${day}${daySuffix(day)} ${month} ${year}`;
}