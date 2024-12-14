 export default function generateSlug(title: string) {
    return title
      .toLowerCase()                  // Convert to lowercase
      .trim()                         // Remove leading/trailing spaces
      .replace(/[\s\W-]+/g, '-')      // Replace spaces, non-word characters, and hyphens with a single hyphen
      .replace(/^-+|-+$/g, '');       // Remove any leading or trailing hyphens
  }