import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';

@Module({
  providers: [RoleService],
  imports: [DatabaseModule],
  controllers: [RoleController],
})
export class RoleModule {}
