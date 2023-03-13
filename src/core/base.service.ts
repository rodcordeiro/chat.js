import { BaseEntity } from "@/core/base.entity"
import { IBaseInterface, ModelAttirbutes } from '@/core/base.interface';

export class BaseService<Entity extends BaseEntity> implements IBaseInterface<Entity>{
  public create(payload: ModelAttributes<Entity>): Entity {
    return payload
  }
}