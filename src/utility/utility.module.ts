import { Module } from '@nestjs/common';
import { UtilityService } from './utility.service';

@Module({
    imports:[],
    exports:[UtilityService],
    providers:[UtilityService]
})
export class UtilityModule {}
