import { Prisma } from '@prisma/client';
import {
  Catch,
  HttpStatus,
  ArgumentsHost,
  ExceptionFilter,
} from '@nestjs/common';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status: number;
    let message: string;

    switch (exception.code) {
      case 'P2002':
        status = HttpStatus.CONFLICT;
        message = `Unique constraint failed on the field(s): ${(exception.meta?.target as string[])?.join(', ')}`;
        break;

      case 'P2003':
        status = HttpStatus.BAD_REQUEST;
        message = `Foreign key constraint failed on the field(s): ${exception.meta?.field_name}`;
        break;

      case 'P2025':
        status = HttpStatus.NOT_FOUND;
        message = `The record you are trying to access does not exist.`;
        break;

      case 'P2014':
        status = HttpStatus.BAD_REQUEST;
        message = `The change you attempted violates a required relation.`;
        break;

      case 'P2000':
        status = HttpStatus.BAD_REQUEST;
        message = `The value provided for the field '${exception.meta?.column_name}' is too long.`;
        break;

      case 'P2016':
        status = HttpStatus.BAD_REQUEST;
        message = `Query parsing error: ${exception.message}`;
        break;

      case 'P2011':
        status = HttpStatus.BAD_REQUEST;
        message = `Null constraint violation on the field(s): ${exception.meta?.constraint}`;
        break;

      case 'P2024':
        status = HttpStatus.REQUEST_TIMEOUT;
        message = `The request timed out. Please try again later.`;
        break;

      case 'P2022':
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = `The column used in a relation does not exist in the database schema.`;
        break;

      case 'P2004':
        status = HttpStatus.BAD_REQUEST;
        message = `Constraint violation occurred on the database: ${exception.meta?.description || ''}`;
        break;

      case 'P2018':
        status = HttpStatus.BAD_REQUEST;
        message = `Required connected records were not found.`;
        break;

      case 'P2019':
        status = HttpStatus.BAD_REQUEST;
        message = `The value provided for one of the fields is too large.`;
        break;

      case 'P2020':
        status = HttpStatus.BAD_REQUEST;
        message = `The provided value is out of range for the field's type.`;
        break;

      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = `An unexpected error occurred: ${exception.message}`;
        break;
    }

    response.status(status).json({
      message,
      statusCode: status,
      prismaCode: exception.code,
      timestamp: new Date().toISOString(),
    });
  }
}
