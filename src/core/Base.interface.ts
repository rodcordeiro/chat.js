export interface IBaseInterface<Entity>{
  /** 
  Create something
  */
  create(payload:ModelAttributes<Entity>):Entity
}

export type ModelAttributes<T extends BaseEntity> = { [k in keyof T]?: T[k] };
