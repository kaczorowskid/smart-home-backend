import { PartialType } from '@nestjs/mapped-types';
import { CreateThermometerDto } from './create-thermometer.dto';

export class UpdateThermometerDto extends PartialType(CreateThermometerDto) {}
