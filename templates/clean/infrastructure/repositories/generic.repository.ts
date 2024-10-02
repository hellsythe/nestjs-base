// import { NotFoundException } from '@nestjs/common';
// import { IGenericRepository } from '@usecases/common/generic.repository.interface';
// import { Model } from 'mongoose';
// import { PaginateResult } from './paginateResult';

// export abstract class GenericRepository<T, D> implements IGenericRepository<T> {
//   protected model: Model<D>;
//   private pageSize = 20;

//   async findByQueryPaginated(
//     query: any,
//     page: number = 1,
//   ): Promise<PaginateResult<T>> {
//     const total = await this.countByQuery(query);
//     const results = await this.findByQuery(query, page);

//     return {
//       data: results,
//       meta: {
//         current_page: page,
//         from: page * this.pageSize - this.pageSize + 1,
//         last_page: Math.ceil(total / this.pageSize),
//         per_page: this.pageSize,
//         to: page * this.pageSize,
//         total,
//       },
//     };
//   }

//   async countByQuery(query: any): Promise<number> {
//     return await this.model
//       .find({ ...query, deletedAt: null })
//       .countDocuments()
//       .exec();
//   }

//   async findByQuery(query: any, page: number = 1): Promise<T[]> {
//     return (
//       await this.model
//         .find({ ...query, deletedAt: null })
//         .limit(this.pageSize)
//         .skip(this.pageSize * (page - 1))
//         .exec()
//     ).map(this.transform);
//   }

//   async findOne(item: any): Promise<any> {
//     const result = await this.model
//       .findOne({ ...item, deletedAt: null })
//       .exec();
//     if (!result) {
//       throw new NotFoundException('item not found');
//     }
//     return this.transform(result);
//   }

//   async create(item: any): Promise<T> {
//     return this.transform(await this.model.create(item));
//   }

//   async update(find: any, item: any): Promise<T> {
//     const result = await this.model.findOneAndUpdate(find, item).exec();
//     if (!result) {
//       throw new NotFoundException('item not found');
//     }
//     return this.transform(result);
//   }

//   async delete(_id: any): Promise<T> {
//     const result = await this.model
//       .findOneAndUpdate({ _id }, { deletedAt: new Date() })
//       .exec();

//     return this.transform(result);
//   }

//   async deleteHard(_id: any): Promise<any> {
//     return await this.model.findOneAndDelete({ _id }).exec;
//   }

//   async findById(id: string): Promise<T> {
//     return await this.findOne({ _id: id });
//   }

//   protected abstract transform(item: any): T;
// }
