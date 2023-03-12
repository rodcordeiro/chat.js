import {BaseService} from '@/core/base.service';
import { User} from "@/user/user.entity"

export class UserService extends BaseService<User>{
 users: User[] =[];
  create(payload){
    this.users.push(payload)
  }
}