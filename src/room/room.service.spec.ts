import { $Enums } from '@prisma/client';
import { Test, type TestingModule } from '@nestjs/testing';
import { DatabaseService } from 'src/database/database.service';
import * as mapper from './room.mapper';
import { RoomService } from './room.service';

const mockRoom = {
  blinds: [],
  id: 'room-1',
  thermometers: [],
  name: 'Living Room',
};

const mockDatabaseService = {
  room: {
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
};

describe('RoomService', () => {
  let service: RoomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomService,
        { provide: DatabaseService, useValue: mockDatabaseService },
      ],
    }).compile();

    service = module.get<RoomService>(RoomService);
    jest.clearAllMocks();
  });

  describe('deleteRoom', () => {
    it('should delete room by id', async () => {
      mockDatabaseService.room.delete.mockResolvedValue(mockRoom);

      const result = await service.deleteRoom('room-1');

      expect(result).toEqual(mockRoom);
      expect(mockDatabaseService.room.delete).toHaveBeenCalledWith({
        where: { id: 'room-1' },
      });
    });
  });

  describe('getAllRooms', () => {
    it('should return all rooms with blinds and thermometers', async () => {
      mockDatabaseService.room.findMany.mockResolvedValue([mockRoom]);

      const result = await service.getAllRooms();

      expect(result).toEqual([mockRoom]);
      expect(mockDatabaseService.room.findMany).toHaveBeenCalledWith({
        include: {
          blinds: { include: { blind: true } },
          thermometers: { include: { thermometer: true } },
        },
      });
    });
  });

  describe('getOneRoom', () => {
    it('should return room with nested device data', async () => {
      mockDatabaseService.room.findUnique.mockResolvedValue(mockRoom);

      const result = await service.getOneRoom('room-1');

      expect(result).toEqual(mockRoom);
      expect(mockDatabaseService.room.findUnique).toHaveBeenCalledWith({
        where: { id: 'room-1' },
        include: {
          blinds: { include: { blind: true } },
          thermometers: {
            include: { thermometer: { include: { data: true } } },
          },
        },
      });
    });
  });

  describe('createRoom', () => {
    it('should create room with mapped device join tables', async () => {
      const dto = {
        name: 'Bedroom',
        blinds: [{ id: 'blind-1' }],
        roomType: $Enums.RoomType.BEDROOM,
        thermometers: [{ id: 'thermo-1' }],
      };
      const mapSpy = jest
        .spyOn(mapper, 'connectDeviceToJoinTableMapper')
        .mockReturnValueOnce([{ blind: { connect: { id: 'blind-1' } } }] as any)
        .mockReturnValueOnce([
          { thermometer: { connect: { id: 'thermo-1' } } },
        ] as any);
      mockDatabaseService.room.create.mockResolvedValue({
        id: 'room-2',
        ...dto,
      });

      const result = await service.createRoom(dto);

      expect(result.id).toBe('room-2');
      expect(mapSpy).toHaveBeenCalledWith([{ id: 'blind-1' }], 'blind');
      expect(mapSpy).toHaveBeenCalledWith([{ id: 'thermo-1' }], 'thermometer');
      expect(mockDatabaseService.room.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          name: 'Bedroom',
          blinds: { create: expect.any(Array) },
          thermometers: { create: expect.any(Array) },
        }),
      });
    });
  });

  describe('updateRoom', () => {
    it('should delete existing join entries and create new ones', async () => {
      const dto = {
        name: 'Updated Room',
        blinds: [{ id: 'blind-2' }],
        thermometers: [{ id: 'thermo-2' }],
        roomType: $Enums.RoomType.LIVINGROOM,
      };
      jest
        .spyOn(mapper, 'connectDeviceToJoinTableMapper')
        .mockReturnValueOnce([{ blind: { connect: { id: 'blind-2' } } }] as any)
        .mockReturnValueOnce([
          { thermometer: { connect: { id: 'thermo-2' } } },
        ] as any);
      mockDatabaseService.room.update.mockResolvedValue({
        id: 'room-1',
        ...dto,
      });

      const result = await service.updateRoom('room-1', dto);

      expect(result.name).toBe('Updated Room');
      expect(mockDatabaseService.room.update).toHaveBeenCalledWith({
        where: { id: 'room-1' },
        data: expect.objectContaining({
          blinds: {
            create: expect.any(Array),
            deleteMany: { roomId: 'room-1' },
          },
          thermometers: {
            create: expect.any(Array),
            deleteMany: { roomId: 'room-1' },
          },
        }),
      });
    });
  });
});
