"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertHoursStringtoMinutes = void 0;
// 18:00 -> (18 * 60) + 0 -> 1080
function convertHoursStringtoMinutes(hourString) {
    const [hour, minutes] = hourString.split(':').map(Number);
    const minutesAmount = (hour * 60) + minutes;
    return minutesAmount;
}
exports.convertHoursStringtoMinutes = convertHoursStringtoMinutes;
//# sourceMappingURL=covert-hours-string-to-minutes.js.map