export function getBlogDate(date: Date) {
    const blogDate = date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        
    });
    return blogDate;
}

export function getShortBlogDate(date: Date) {
    const blogDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        
    });
    return blogDate;
}