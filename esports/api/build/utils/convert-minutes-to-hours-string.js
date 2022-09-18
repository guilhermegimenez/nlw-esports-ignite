"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertMinutesToHourString = void 0;
// 1080 -> (1080 8 60) + 0 -> 18:00
function convertMinutesToHourString(minutesAmount) {
    const hour = Math.floor(minutesAmount / 60);
    const minutes = minutesAmount % 60;
    return `${String(hour).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}
exports.convertMinutesToHourString = convertMinutesToHourString;
//# sourceMappingURL=convert-minutes-to-hours-string.js.map