export const sensorsTopics = {
  thermometerData:
    process.env.NODE_ENV === 'dev'
      ? 'dev/sensors/thermometer'
      : 'prod/sensors/thermometer',
};
