import { PartialType } from '@nestjs/mapped-types';
import { CreateBlindDto } from './create-blind.dto';

export class UpdateBlindDto extends PartialType(CreateBlindDto) {}
