import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteStatus } from "src/commons/enums/delete-status.enum";
import { CreateUserDto } from "src/models/dto/create-user.dto";
import { User } from "src/models/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    @InjectRepository(User)
    private readonly userRepository: Repository<User>;

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const existUser = await this.userRepository.findOne({where: {
            email: createUserDto.email
        }});
        if (existUser) {
            throw new BadRequestException('이미 존재하는 사용자입니다.')
        }
        const createdUser: User = this.userRepository.create(createUserDto);
        return await this.userRepository.save(createdUser);
    }

    async deleteUser(id: number): Promise<DeleteStatus> {
        const user = await this.userRepository.findOne({where:{id:id}});
        if (!user || user == null) {
            return DeleteStatus.Fail;
        }
        await this.userRepository.delete(id);
        return DeleteStatus.Success;
    }

    async findOneUserByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findOne({where: {email: email}});
    }

    async findOneUserById(id: number): Promise<User | null> {
        return await this.userRepository.findOne({where: {id: id}});
    }
}