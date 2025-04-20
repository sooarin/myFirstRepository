import { PickType } from "@nestjs/swagger";
import { Board } from "../entities/board.entity";

export class UpdateBoardDto extends PickType(Board, ['title', 'description']) {}