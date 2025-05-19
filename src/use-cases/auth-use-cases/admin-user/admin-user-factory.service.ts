import { Injectable } from '@nestjs/common';
import { AdminRoleEnum } from 'src/common/enums/admin-role.enum';
import {
  CreateAdminDto,
  CreateUpdateAdminDto,
  UpdateAdminDto,
  UpdateAdminPasswordDto,
} from 'src/core/dtos/request/admin.dto';
import { AdminModel } from 'src/core/models';

@Injectable()
export class AdminUserFactoryService {
  createNewAdmin(createAdminDto: CreateAdminDto) {
    const admin = new AdminModel();
    admin.name = createAdminDto.name;
    admin.email = createAdminDto.email;
    admin.password = createAdminDto.password;
    admin.avatar = createAdminDto.avatar;
    return admin;
  }

  updateAdmin(updateAdminDto: UpdateAdminDto) {
    const newAdmin = new AdminModel();
    newAdmin.name = updateAdminDto.name;
    newAdmin.accountNumber = updateAdminDto.accountNumber;
    newAdmin.avatar = updateAdminDto.avatar;
    return newAdmin;
  }

  updateAdminPassword(updateAdminPasswordDto: UpdateAdminPasswordDto) {
    const newAdmin = new AdminModel();
    newAdmin.password = updateAdminPasswordDto.newPassword;
    return newAdmin;
  }

  adminActionCreateAdmin(createDto: CreateUpdateAdminDto) {
    const newAdmin = new AdminModel();
    newAdmin.name = createDto.name;
    newAdmin.email = createDto.email;
    newAdmin.password = createDto.password;
    newAdmin.decodedPassword = createDto.password;
    if (createDto.avatar) newAdmin.avatar = createDto.avatar;
    newAdmin.role = AdminRoleEnum.FLEET_MANAGER;
    newAdmin.abn = createDto.abn;
    newAdmin.address = createDto.address;
    newAdmin.contactNumber = createDto.contactNumber;
    newAdmin.accountNumber = createDto.accountNumber;
    newAdmin.businessName = createDto.businessName;
    return newAdmin;
  }

  updateAdminAction(updateDto: CreateUpdateAdminDto) {
    const admin = new AdminModel();
    admin.id = updateDto.adminId;
    if (updateDto.name) admin.name = updateDto.name;
    if (updateDto.email) admin.email = updateDto.email;
    if (updateDto.businessName) admin.businessName = updateDto.businessName;
    if (updateDto.abn) admin.abn = updateDto.abn;
    if (updateDto.contactNumber) admin.contactNumber = updateDto.contactNumber;
    if (updateDto.address) admin.address = updateDto.address;
    if (updateDto.avatar) admin.avatar = updateDto.avatar;
    if (updateDto.accountNumber) admin.accountNumber = updateDto.accountNumber;
    return admin;
  }
}
