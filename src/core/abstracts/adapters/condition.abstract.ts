import { FindOperator } from 'typeorm';

export type IConditionType<T> = FindOperator<T> | T;
