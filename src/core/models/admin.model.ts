import { AdminRoleEnum } from 'src/common/enums/admin-role.enum';
import { AdminEntity } from 'src/frameworks/data-services/pg/entities';

export class AdminModel extends AdminEntity {
  id: string;
  name: string;
  businessName: string;
  abn: string;
  contactNumber: string;
  address: string;
  email: string;
  password: string;
  decodedPassword: string;
  avatar: string;
  accountNumber: string;
  expressFreightFixedPrice?: number | null;
  role: AdminRoleEnum;
}
