export const name = {
  minLength: 3,
  maxLength: 50,
};

export const deviceId = {
  minLength: 1,
  maxLength: 3,
};

export const password = {
  minLength: 3,
  minNumbers: 1,
  minSymbols: 1,
  minLowercase: 1,
  minUppercase: 1,
};

export const temperature = {
  max: 50,
  min: -50,
};

export const humidity = {
  min: 0,
  max: 100,
};

export const battery = {
  min: 0,
  max: 100,
};
