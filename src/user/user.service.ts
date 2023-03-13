import {BaseService} from '@/core/base.service';
import { User} from "@/user/user.entity"
import { CreateUserDTO } from "@/user/user.dto";
export class UserService extends BaseService<User>{
 users: User[] =[];
  create(payload: CreateUserDTO){
    this.users.push(payload)
  }
}