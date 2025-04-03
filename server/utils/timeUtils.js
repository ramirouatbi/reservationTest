import { DateTime } from 'luxon';

export const generateTimeSlots = (startHour, endHour, intervalMinutes) => {
  const slots = [];

  let current = DateTime.fromObject({ hour: startHour, minute: 0 });
  let endTime = DateTime.fromObject({ hour: endHour, minute: 0 });
  while (current <= endTime) {
    slots.push(current.toFormat('HH:mm'));
    current = current.plus({ minutes: intervalMinutes });
  }

  return slots;
};

export default generateTimeSlots;
