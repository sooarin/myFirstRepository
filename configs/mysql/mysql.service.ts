import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class MysqlService implements TypeOrmOptionsFactory{
    constructor(private readonly configService: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        const mysqlConfigOptions = this.configService.get('db');
        return {
            ...mysqlConfigOptions,
            autoLoadEntities: true,
        }
    }
}