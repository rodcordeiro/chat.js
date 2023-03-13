import { User } from '@/user/user.entity';
import { Message } from '@/chat/message.entity';
import { BaseService } from '@/core/base.service';

export class MessageService extends BaseService<Message>{
  send(content:string){}
  render(message:Message){}
}