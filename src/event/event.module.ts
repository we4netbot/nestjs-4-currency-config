import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { EventEntity } from './entities/event.entity';
import { EventService } from './event.service';

@Module({
    imports: [TypeOrmModule.forFeature([EventEntity,UserEntity])],
    providers: [EventService],
    exports: [EventService]
})
export class EventModule {}
