export interface IOptimizerOptions {
  quality?: number;
  resize?: {
    height?: number;
    width?: number;
  };
}

export abstract class IImageOptimizer {
  abstract optimizeImage(image: Buffer, option?: IOptimizerOptions): Promise<Buffer>;
}
