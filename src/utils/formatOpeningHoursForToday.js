const formatOpeningHoursForToday = (openingHours) => {
    if (openingHours === null)
        return ``;
    const daysOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const todayIndex = new Date().getDay();
    const today = daysOfWeek[todayIndex];

    if (openingHours[today].length > 0) {
        const startTime = formatTime(openingHours[today][0].startTime);
        const endTime = formatTime(openingHours[today][0].endTime);
        return `${startTime} - ${endTime}`;
    } else {
        return `Closed`;
    }
};

const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
};

export default formatOpeningHoursForToday;