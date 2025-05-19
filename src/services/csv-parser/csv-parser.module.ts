import { Module } from '@nestjs/common';
import { IcsvParser } from 'src/core/abstracts/csv-parser/Icsv-parser.abstract';
import { CsvParserService } from './csv-parser.service';

@Module({
  imports: [],
  providers: [
    {
      provide: IcsvParser,
      useClass: CsvParserService,
    },
  ],
  exports: [IcsvParser],
})
export class CsvParserModule {}
