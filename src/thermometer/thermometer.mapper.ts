import { ONE_MINUTE_MS } from 'src/constants/time';
import { differenceInMilliseconds } from 'date-fns';
import { type ThermometerWithData } from 'src/common/types/common.types';

export const mapThermometerStatus = (
  thermometer: null | Omit<ThermometerWithData, 'status'>,
) => {
  if (!thermometer) {
    return;
  }

  const { data, ...rest } = thermometer;

  if (!data?.length) {
    return { ...rest, status: 'offline' };
  }

  const twelveMinutesMs = ONE_MINUTE_MS * 12;
  const latestDataDate = new Date(data[0].createdAt);
  const isOffline =
    differenceInMilliseconds(new Date(), latestDataDate) > twelveMinutesMs;

  return {
    ...rest,
    data,
    status: isOffline ? 'offline' : 'online',
  };
};
