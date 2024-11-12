export const userCreateTokenExpiration = '2d';

const ONE_MINUTE_MS = 100 * 60;
const ONE_HOUR_MS = ONE_MINUTE_MS * 60;

export const accessTokenExpirationMs = ONE_MINUTE_MS * 10;
export const refreshTokenExpirationMs = ONE_HOUR_MS * 24 * 7;
