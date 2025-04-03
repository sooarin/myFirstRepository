import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { AuthConfig } from "configs";
import { AuthController } from "src/controllers/auth.controller";
import { AuthService } from "src/services/auth/auth.service";
import { UserModule } from "src/services/user/user.module";

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