type ConnectDevice<T extends string> = {
  [K in T]: {
    connect: { id: string };
  };
};

export const connectDeviceToJoinTableMapper = <T extends string>(
  idsArray: { id: string }[],
  key: T,
) =>
  idsArray?.map(({ id }) => ({
    [key]: {
      connect: {
        id,
      },
    },
  })) as ConnectDevice<T>[];
