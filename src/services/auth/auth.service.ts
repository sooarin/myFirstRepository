import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Payload } from "src/auth/payload";
import { Token } from "src/auth/token";
import { LoginDto } from "src/models/dto/login.dto";
import { User } from "src/models/entities/user.entity";
import { UserService } from "src/services/user/user.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) {}

    async login(loginDto: LoginDto): Promise<Token> {
        const user = await this.userService.findOneUserByEmail(loginDto.email);
        if (!user || null) {
            throw new NotFoundException('존재하지 않는 사용자입니다.')
        }
        return await this.createToken(user);
    }


    async createToken(user: User): Promise<Token> {
        const payload: Payload = {
          id: user.id,
          email: user.email,
          password: user.passwd,
        };
    
        const accessToken = await this.jwtService.signAsync(payload);
        const refreshToken = await this.jwtService.signAsync(payload, {
          jwtid: accessToken,
          expiresIn: 604800,
        });
    
        return {
          accessToken,
          refreshToken,
        };
      }
}