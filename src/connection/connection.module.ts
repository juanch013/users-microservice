import { Module } from '@nestjs/common';
import { ConnectionService } from './connection.service';

@Module({
    imports:[],
    controllers: [],
    providers: [ConnectionService],
})
export class ConnectionModule {}
