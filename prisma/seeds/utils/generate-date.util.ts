import { startOfDay, addMinutes } from 'date-fns';

export const generateISODate = (count: number) => {
  const isoDates = [];
  const baseDate = startOfDay(new Date());

  for (let i = 0; i <= count; i++) {
    const newTime = addMinutes(baseDate, i * 10);
    isoDates.push(newTime.toISOString());
  }

  return isoDates;
};
