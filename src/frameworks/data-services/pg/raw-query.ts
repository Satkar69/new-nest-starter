import { Inject } from '@nestjs/common';
import AppException from 'src/application/exception/app.exception';
import InjectableString from 'src/common/injectable.string';
import { IRawQuery } from 'src/core/abstracts/raw-query.abstract';
import { DataSource } from 'typeorm';

export class RawQuery implements IRawQuery {
  constructor(
    @Inject(InjectableString.APP_DATA_SOURCE)
    private dataSource: DataSource,
  ) {}
  async execute(query: string): Promise<any> {
    if (!query) {
      throw new AppException('Query is required');
    }
    return await this.dataSource.query(query);
  }
}
