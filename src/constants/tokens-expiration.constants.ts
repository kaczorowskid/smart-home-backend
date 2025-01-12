import { ONE_HOUR_MS, ONE_MINUTE_MS } from './time';

export const userCreateTokenExpiration = '2d';

export const accessTokenExpirationMs = ONE_MINUTE_MS * 20;
export const refreshTokenExpirationMs = ONE_HOUR_MS * 24 * 7;
