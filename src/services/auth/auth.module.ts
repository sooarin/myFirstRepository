import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../user/user.module";
import { AuthConfig } from "../../../configs";
import { AuthService } from "./auth.service";
import { AuthController } from "../../controllers/auth.controller";

@Module({
    imports: [
        UserModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const authConfig = configService.get<AuthConfig>('auth');
                if (!authConfig || !authConfig.jwt) {
                throw new Error('JWT 환경변수 미설정');
                }
                return authConfig.jwt;
            }
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule{}