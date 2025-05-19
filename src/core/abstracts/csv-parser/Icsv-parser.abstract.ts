import { Readable } from 'stream';

export abstract class IcsvParser {
  abstract parseCsv(file: Buffer): any;
  abstract parseCsvStream(file: Buffer): Readable;
  abstract parseHeader(file: Buffer): Promise<string[]>;
  abstract validateMinNoOfRows(file: Buffer, min: number): Promise<boolean>;
}
