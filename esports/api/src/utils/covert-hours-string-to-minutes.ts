// 18:00 -> (18 * 60) + 0 -> 1080
export function convertHoursStringtoMinutes(hourString: string) {
    const [hour, minutes] = hourString.split(':').map(Number);
    const minutesAmount = (hour * 60) + minutes;
    return minutesAmount;
}