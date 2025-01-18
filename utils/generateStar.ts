export function generateStars(rating: number): string {
    
    const maxStars = 5; // Maximum number of stars
    const filledStars = '★'.repeat(Math.min(rating, maxStars)); // Filled stars
    const emptyStars = '☆'.repeat(maxStars - Math.min(rating, maxStars)); // Empty stars
    return filledStars + emptyStars;
  }