// import { PaginateResult } from '@infra/repositories/paginateResult';

export interface IGenericRepository<T> {
  // findByQueryPaginated(query: any, page?: number): Promise<PaginateResult<T>>;
  countByQuery(query: any): Promise<number>;
  findByQuery(query: any, page?: number): Promise<T[]>;
  findOne(item: any): Promise<T>;
  findById(id: string): Promise<T>;
  create(item: any): Promise<T>;
  update(id: string, item: any): Promise<T>;
  delete(id: string): Promise<T>;
}
