
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

