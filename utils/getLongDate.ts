
export const getLongDate = (dateString: string) => {
    const dayOfWeek = [
        "Sunday", "Monday", "Tuesday", 
        "Wednesday", "Thursday", "Friday", 
        "Saturday"
    ];
    const monthOfYear = [
       "January", "February", "March", 
       "April", "May", "June", 
       "July", "August", "September", 
       "October", "November", "December"
    ];
    const date = new Date(dateString);
    const dayName = dayOfWeek[date.getDay()];
    const monthName = monthOfYear[date.getMonth()];
    const dayOfMonth = date.getDate();

    return `${dayName}, ${monthName} ${dayOfMonth}`;
}
