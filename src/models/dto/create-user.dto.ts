import { PickType } from "@nestjs/swagger";
import { User } from "src/models/entities/user.entity";

export class CreateUserDto extends PickType(User, ['name', 'email', 'passwd']){

}
