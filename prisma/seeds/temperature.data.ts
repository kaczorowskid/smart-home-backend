export const generateData = () => {
  const data = [];
  const date = new Date('2023-08-10T00:00:00.000Z');

  while (date.getDate() === 10) {
    const temperature = (Math.random() * 4 + 20).toFixed(1);
    const humidity = Math.floor(Math.random() * 31 + 40);

    data.push({
      date: date.toISOString(),
      temperature: parseFloat(temperature),
      humidity: humidity,
    });

    date.setMinutes(date.getMinutes() + 15);
  }

  return data;
};
