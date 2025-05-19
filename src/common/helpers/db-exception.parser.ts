// const logger = new AppLogger('Db Exception Parser');

import { IError } from '../type/iError';

const dubplicateKey = (e: any): IError => {
  const { detail } = e;
  const regex = /Key \((.*?)\)=\((.*?)\) already exists\./g;
  const match = regex.exec(detail);
  const [, key, value] = match;
  return {
    [key]: `${value} already exists`,
  };
};

const donotExist = (e: any): IError => {
  const { detail } = e;
  const regex = /Key \((.*?)\)=\((.*?)\) is not present in table "(.*?)"\./g;
  const match = regex.exec(detail);
  const [, key, value] = match;
  return {
    [key]: `${value} is not present in table`,
  };
};

export const DbExceptionParser = (e: any): IError => {
  const { code } = e;
  switch (code as string) {
    case '23505':
      return dubplicateKey(e);
    case '23503':
      return donotExist(e);
    default:
      // logger.error(e);
      return {
        message: e.message,
      };
  }
};
