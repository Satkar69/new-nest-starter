import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
    name: 'created_at',
  })
  public createdAt?: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    name: 'updated_at',
    select: false,
  })
  public updatedAt?: Date;

  @DeleteDateColumn({
    type: 'timestamptz',
    default: null,
    nullable: true,
    select: false,
    name: 'deleted_at',
  })
  public deletedAt?: Date;

  static get REPOSITORY(): string {
    const name = this.name
      .replace(/([A-Z])/g, ' $1')
      .replace(/entity/gi, '')
      .trim()
      .split(' ')
      .join('_')
      .toUpperCase();
    return `${name}_REPOSITORY`;
  }
}
