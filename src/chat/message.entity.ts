import {User} from '@/user/user.entity';



export class Message{
  author: User;
  content: string;
  sentAt: string; // ISO Format
}