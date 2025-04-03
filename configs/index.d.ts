import { JwtModuleAsyncOptions, JwtModuleOptions } from "@nestjs/jwt";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions"

export interface AuthConfig {
    jwt: {
        secret: string;
        signOptions?: {
          expiresIn?: number;
        };
    };
}

export type Config = {
    db: MysqlConnectionOptions;
    auth: AuthConfig;
}