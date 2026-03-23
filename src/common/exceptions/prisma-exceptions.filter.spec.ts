import { Prisma } from '@prisma/client';
import { HttpStatus } from '@nestjs/common';
import { PrismaExceptionFilter } from './prisma-exceptions.filter';

const createMockHost = () => {
  const json = jest.fn();
  const status = jest.fn().mockReturnValue({ json });

  return {
    json,
    status,
    host: {
      switchToHttp: () => ({
        getResponse: () => ({ status }),
      }),
    } as any,
  };
};

const createPrismaError = (code: string, meta?: Record<string, unknown>) =>
  new Prisma.PrismaClientKnownRequestError('Test error', {
    code,
    meta,
    clientVersion: '5.0.0',
  });

describe('PrismaExceptionFilter', () => {
  let filter: PrismaExceptionFilter;

  beforeEach(() => {
    filter = new PrismaExceptionFilter();
  });

  it('should handle P2002 (unique constraint) as CONFLICT', () => {
    const { host, json, status } = createMockHost();
    const error = createPrismaError('P2002', { target: ['email'] });

    filter.catch(error, host);

    expect(status).toHaveBeenCalledWith(HttpStatus.CONFLICT);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({
        prismaCode: 'P2002',
        statusCode: HttpStatus.CONFLICT,
        message: expect.stringContaining('email'),
      }),
    );
  });

  it('should handle P2003 (foreign key) as BAD_REQUEST', () => {
    const { host, json, status } = createMockHost();
    const error = createPrismaError('P2003', { field_name: 'roleId' });

    filter.catch(error, host);

    expect(status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.stringContaining('roleId'),
      }),
    );
  });

  it('should handle P2025 (not found) as NOT_FOUND', () => {
    const { host, status } = createMockHost();
    const error = createPrismaError('P2025');

    filter.catch(error, host);

    expect(status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
  });

  it('should handle P2014 (relation violation) as BAD_REQUEST', () => {
    const { host, status } = createMockHost();
    const error = createPrismaError('P2014');

    filter.catch(error, host);

    expect(status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
  });

  it('should handle P2000 (value too long) as BAD_REQUEST', () => {
    const { host, json, status } = createMockHost();
    const error = createPrismaError('P2000', { column_name: 'name' });

    filter.catch(error, host);

    expect(status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.stringContaining('name'),
      }),
    );
  });

  it('should handle P2024 (timeout) as REQUEST_TIMEOUT', () => {
    const { host, status } = createMockHost();
    const error = createPrismaError('P2024');

    filter.catch(error, host);

    expect(status).toHaveBeenCalledWith(HttpStatus.REQUEST_TIMEOUT);
  });

  it('should handle P2022 (schema error) as INTERNAL_SERVER_ERROR', () => {
    const { host, status } = createMockHost();
    const error = createPrismaError('P2022');

    filter.catch(error, host);

    expect(status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it('should handle unknown code as INTERNAL_SERVER_ERROR', () => {
    const { host, status } = createMockHost();
    const error = createPrismaError('P9999');

    filter.catch(error, host);

    expect(status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it('should include timestamp in response', () => {
    const { host, json } = createMockHost();
    const error = createPrismaError('P2025');

    filter.catch(error, host);

    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({
        timestamp: expect.any(String),
      }),
    );
  });
});
