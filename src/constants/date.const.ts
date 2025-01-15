import { endOfDay, startOfDay } from 'date-fns';

type DateRange = {
  to: Date;
  from: Date;
};

export const dateLastDay: DateRange = {
  to: endOfDay(new Date()),
  from: startOfDay(new Date()),
};
