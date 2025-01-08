import { type ThermometerData } from './thermometer-data.types';

export const mapValuesFromDevice = (
  thermometerData: ThermometerData,
): ThermometerData => ({
  ...thermometerData,
  humidity: Number(thermometerData.humidity.toFixed(1)),
  temperature: Number(thermometerData.temperature.toFixed(1)),
});
