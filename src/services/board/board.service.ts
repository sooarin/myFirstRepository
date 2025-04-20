import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DeleteStatus } from "../../commons/enums/delete-status.enum";
import { Board } from "../../models/entities/board.entity";
import { User } from "../../models/entities/user.entity";
import { CreateBoardDto } from "../../models/dto/create-board.dto";
import { UpdateBoardDto } from "../../models/dto/update-board.dto";

@Injectable()
export class BoardService {
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>;

    async createBoard(user: User, createBoardDto: CreateBoardDto): Promise<Board> {
        const board:Board = this.boardRepository.create({...createBoardDto, user: user});
        return await this.boardRepository.save(board);
    }

    async updateBoard(user: User, id: number, updateBoardDto: UpdateBoardDto): Promise<Board> {
        const existBoard = await this.boardRepository.findOne({where: { id: id, user: user }});
        if (existBoard == null) {
            throw new NotFoundException("해당 게시물이 없습니다.");
        }
        await this.boardRepository.update(existBoard.id, updateBoardDto);
        const updatedBoard = await this.boardRepository.findOne({where: { id: id }});
        if (updatedBoard == null) {
            throw new InternalServerErrorException("수정에 실패하였습니다.");
        }
        return updatedBoard;
    }

    async deleteBoard(user: User ,id: number): Promise<DeleteStatus> {
        const existBoard = await this.boardRepository.findOne({ where: { id: id, user: user }});
        if (existBoard == null) {
            return DeleteStatus.Fail;
        }
        await this.boardRepository.delete(id);
        return DeleteStatus.Success;
    }

    async findOneBoard(id: number): Promise<Board> {
        const board = await this.boardRepository.findOne({where: { id: id }});
        if (board == null) {
            throw new NotFoundException("해당 게시물이 없습니다.");
        }
        return board;
    }

    async findAllBoard(): Promise<Board[]> {
        return await this.boardRepository.find();
    }
}