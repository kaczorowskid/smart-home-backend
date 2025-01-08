import { type $Enums, type Prisma } from '@prisma/client';

export class CreateRoleDto
  implements Omit<Prisma.RoleCreateInput, 'permissions'>
{
  name: string;
  permissions: $Enums.PermissionType[];
}
