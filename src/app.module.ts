import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
import { UtilityService } from './utility/utility.service';
import { UtilityModule } from './utility/utility.module';
import { ConfigModule } from './config/config.module';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: '123',
      extra: {
        trustServerCertificate: true,
      },
      database: 'db1',
      synchronize: true, //save live change entity in database for develope/for production /*false*/
      autoLoadEntities: true
    }),
    UserModule,
    EventModule,
    PostModule,
    UtilityModule,
    ConfigModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
