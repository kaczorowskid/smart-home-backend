import { ThermometerData } from './thermometer-data.types';

export const mapValuesFromDevice = (
  thermometerData: ThermometerData,
): ThermometerData => ({
  ...thermometerData,
  temperature: Number(thermometerData.temperature.toFixed(1)),
  humidity: Number(thermometerData.humidity.toFixed(1)),
});
