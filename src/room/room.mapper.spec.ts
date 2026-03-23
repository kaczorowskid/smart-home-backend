import { connectDeviceToJoinTableMapper } from './room.mapper';

describe('connectDeviceToJoinTableMapper', () => {
  it('should map ids to connect format with given key', () => {
    const ids = [{ id: 'blind-1' }, { id: 'blind-2' }];

    const result = connectDeviceToJoinTableMapper(ids, 'blind');

    expect(result).toEqual([
      { blind: { connect: { id: 'blind-1' } } },
      { blind: { connect: { id: 'blind-2' } } },
    ]);
  });

  it('should work with thermometer key', () => {
    const ids = [{ id: 'thermo-1' }];

    const result = connectDeviceToJoinTableMapper(ids, 'thermometer');

    expect(result).toEqual([{ thermometer: { connect: { id: 'thermo-1' } } }]);
  });

  it('should return empty array for empty input', () => {
    const result = connectDeviceToJoinTableMapper([], 'blind');

    expect(result).toEqual([]);
  });

  it('should return undefined for undefined input', () => {
    const result = connectDeviceToJoinTableMapper(undefined, 'blind');

    expect(result).toBeUndefined();
  });
});
