import { Injectable } from '@nestjs/common';
import * as fastcsv from 'fast-csv';
import { toCamelCase } from 'src/common/helpers/slugify';
import { IcsvParser } from 'src/core/abstracts/csv-parser/Icsv-parser.abstract';
import { Readable } from 'stream';

@Injectable()
export class CsvParserService implements IcsvParser {
  parseCsv(file: Buffer): any {}
  parseCsvStream(file: Buffer): Readable {
    const stream = new Readable();
    stream.push(file);
    stream.push(null);
    return stream.pipe(
      fastcsv.parse({
        headers: (headers) => {
          return headers.map((header) => toCamelCase(header));
        },
        renameHeaders: true,
      }),
    );
  }

  parseHeader(file: Buffer): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const stream = new Readable();
      stream.push(file);
      stream.push(null);

      fastcsv
        .parseStream(stream, { headers: true, ignoreEmpty: true })
        .on('data', (row) => {
          resolve(Object.keys(row));
          stream.destroy();
        })
        .on('end', () => {
          reject(new Error('Empty csv file')); // Reject if no headers found
        })
        .on('error', (error) => {
          reject(error); // Reject on error
        });
    });
  }

  validateMinNoOfRows(file: Buffer, min: number = 2): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let rowCount = 0;

      const stream = new Readable();
      stream.push(file);
      stream.push(null);

      fastcsv
        .parseStream(stream, { headers: true })
        .on('data', () => {
          rowCount++;
          if (rowCount >= min) {
            resolve(true);
            stream.destroy();
          }
        })
        .on('end', () => {
          resolve(rowCount >= min);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }
}
