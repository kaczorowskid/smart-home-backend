import { applyDecorators } from '@nestjs/common';
import {
  IsNumber,
  IsString,
  IsStrongPassword,
  Length,
  Max,
  Min,
} from 'class-validator';
import {
  battery,
  deviceId,
  humidity,
  name,
  password,
  temperature,
} from './validations';

export function IsName() {
  return applyDecorators(Length(name.minLength, name.maxLength), IsString());
}

export function IsDeviceId() {
  return applyDecorators(
    Length(deviceId.minLength, deviceId.maxLength),
    IsString(),
  );
}

export function IsPassword() {
  return applyDecorators(
    IsStrongPassword({
      minLength: password.minLength,
      minLowercase: password.minLowercase,
      minNumbers: password.minNumbers,
      minSymbols: password.minSymbols,
      minUppercase: password.minUppercase,
    }),
  );
}

export function IsTemperature() {
  return applyDecorators(
    IsNumber(),
    Min(temperature.min),
    Max(temperature.max),
  );
}

export function IsHumidity() {
  return applyDecorators(IsNumber(), Min(humidity.min), Max(humidity.max));
}

export function IsBattery() {
  return applyDecorators(IsNumber(), Min(battery.min), Max(battery.max));
}
