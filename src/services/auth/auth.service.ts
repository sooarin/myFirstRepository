import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../../models/entities/user.entity";
import { UserService } from "../user/user.service";
import { Token } from "../../auth/token";
import { LoginDto } from "../../models/dto/login.dto";
import { Payload } from "../../auth/payload";

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