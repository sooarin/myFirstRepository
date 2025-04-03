import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'configs/configuration';
import { MysqlService } from 'configs/mysql/mysql.service';
import { UserModule } from 'src/services/user/user.module';
import { AuthModule } from 'src/services/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load:[configuration]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useClass: MysqlService,
    }),
    UserModule,
    AuthModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
