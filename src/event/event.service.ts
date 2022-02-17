import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventRefTypeEnum } from 'src/enums/event-ref-type.enum';
import { EventTypesEnum } from 'src/enums/event-types.enum';
import { Repository } from 'typeorm';
import { EventEntity } from './entities/event.entity';

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(EventEntity)
        private readonly EventRepository: Repository<EventEntity>
    ){}

    async getEventByUser(refId: Number, refType: EventRefTypeEnum, userId: number, type: EventTypesEnum ){
        const events = await this.EventRepository.find({
            where:{
                refId,
                refType,
                userId,
                type
            }
        });
        return events
    }
}
