import { AdminRoleEnum } from 'src/common/enums/admin-role.enum';
import { BeforeInsert, Column, Entity, Unique } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { BaseEntity } from './base.entity';

@Entity('admins')
@Unique(['businessName'])
export class AdminEntity extends BaseEntity {
  @Column({
    name: 'full_name',
  })
  name: string;

  @Column({
    name: 'business_name',
    nullable: true,
  })
  businessName: string;

  @Column({
    name: 'abn',
    nullable: true,
  })
  abn: string;

  @Column({
    name: 'contact_number',
    nullable: true,
  })
  contactNumber: string;

  @Column({
    name: 'address',
    nullable: true,
  })
  address: string;

  @Column({
    name: 'email',
    unique: true,
  })
  email: string;

  @Column({
    name: 'password',
  })
  password: string;

  @Column({
    name: 'decoded_password',
    nullable: true,
  })
  decodedPassword: string;

  @Column({
    default: AdminRoleEnum.FLEET_MANAGER,
    name: 'role',
  })
  role: AdminRoleEnum;

  @Column({
    nullable: true,
    name: 'avatar',
  })
  avatar: string;

  @Column({
    name: 'account_number',
    nullable: true,
  })
  accountNumber: string;

  async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }

  // hashPassword
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  @BeforeInsert()
  async hashPasswordBeforeInsert(): Promise<void> {
    this.password = await this.hashPassword(this.password);
  }

  toJSON() {
    return {
      ...this,
      password: undefined,
    };
  }
}
