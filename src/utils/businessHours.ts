/**
 * Returns true if the current local time falls within openingTime and closingTime (HH:MM, 24h)
 */
export function checkIsOpen(openingTime: string, closingTime: string): boolean {
    if (!openingTime || !closingTime) return true; // Default to open if settings missing

    const now = new Date();
    const [openH, openM] = openingTime.split(':').map(Number);
    const [closeH, closeM] = closingTime.split(':').map(Number);

    const nowMins = now.getHours() * 60 + now.getMinutes();
    const openMins = openH * 60 + openM;
    const closeMins = closeH * 60 + closeM;

    return nowMins >= openMins && nowMins < closeMins;
}

/**
 * Format HH:MM (24h) to readable 12h e.g. "8:00 AM"
 */
export function formatTime(time: string): string {
    if (!time) return '';
    const [hourStr, minStr] = time.split(':');
    let hour = parseInt(hourStr, 10);
    const min = minStr || '00';
    const period = hour >= 12 ? 'PM' : 'AM';
    if (hour === 0) hour = 12;
    else if (hour > 12) hour -= 12;
    return `${hour}:${min} ${period}`;
}
