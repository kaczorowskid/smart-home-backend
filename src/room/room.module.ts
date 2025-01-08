import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';

@Module({
  providers: [RoomService],
  imports: [DatabaseModule],
  controllers: [RoomController],
})
export class RoomModule {}
