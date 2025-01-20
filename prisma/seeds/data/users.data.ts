import { type User } from '@prisma/client';
import { roles } from './roles.data';

export const users: User[] = [
  {
    name: 'Super',
    surname: 'Admin',
    isVerified: true,
    refreshToken: '',
    roleId: roles[0].id,
    createdAt: new Date(),
    updatedAt: new Date(),
    email: 'super@admin.com',
    id: 'b60211e0-71cf-43b0-b62b-fb0fb7aa4f6a',
    password: '$2a$10$ZDQWHBF1k4XFuDsQa2n39OEr/eSpsJXF.8LRkDAdw/bNHAC3u6Da2', // TestPassword!234,
  },
  {
    name: 'Test',
    surname: 'User',
    isVerified: true,
    refreshToken: '',
    roleId: roles[1].id,
    createdAt: new Date(),
    updatedAt: new Date(),
    email: 'test@user.com',
    id: 'dbb03dd0-1d43-4a73-9b7b-61b067ba6278',
    password: '$2a$10$ZDQWHBF1k4XFuDsQa2n39OEr/eSpsJXF.8LRkDAdw/bNHAC3u6Da2', // TestPassword!234,
  },
];
