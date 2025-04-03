import { PickType } from "@nestjs/swagger";
import { User } from "src/models/entities/user.entity";

export class LoginDto extends PickType(User, ['email', 'passwd']){

}