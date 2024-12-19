
export function generateInitial(name: string): string {
    if (!name) return 'MC';
    
    const nameParts = name.split(' ');
    const initials = nameParts.map(part => part.charAt(0).toUpperCase());

    return initials.join('');
}