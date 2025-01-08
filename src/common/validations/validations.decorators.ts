import { applyDecorators } from '@nestjs/common';
import {
  Max,
  Min,
  Length,
  IsNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import {
  name,
  battery,
  deviceId,
  humidity,
  password,
  temperature,
} from './validations';

export function IsBattery() {
  return applyDecorators(IsNumber(), Min(battery.min), Max(battery.max));
}

export function IsName() {
  return applyDecorators(Length(name.minLength, name.maxLength), IsString());
}

export function IsHumidity() {
  return applyDecorators(IsNumber(), Min(humidity.min), Max(humidity.max));
}

export function IsDeviceId() {
  return applyDecorators(
    Length(deviceId.minLength, deviceId.maxLength),
    IsString(),
  );
}

export function IsTemperature() {
  return applyDecorators(
    IsNumber(),
    Min(temperature.min),
    Max(temperature.max),
  );
}

export function IsPassword() {
  return applyDecorators(
    IsStrongPassword({
      minLength: password.minLength,
      minNumbers: password.minNumbers,
      minSymbols: password.minSymbols,
      minLowercase: password.minLowercase,
      minUppercase: password.minUppercase,
    }),
  );
}
