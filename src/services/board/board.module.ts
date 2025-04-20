import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Board } from "../../models/entities/board.entity";
import { BoardService } from "./board.service";
import { BoardController } from "../../controllers/board.controller";
import { JwtStrategy } from "../../auth/jwt/jwt.strategy";

@Module({
    imports: [TypeOrmModule.forFeature([Board]), PassportModule],
    controllers: [BoardController],
    providers: [BoardService, JwtStrategy],
    exports: []
})
export class BoardModule {}