import { PermissionType } from '@prisma/client';

type Permission = Record<PermissionType, PermissionObject>;

type UserPermission = PermissionObject & { roleId: string };

type PermissionObject = {
  id: string;
  permission: PermissionType;
};

const permissions: Permission = {
  [PermissionType.IS_ADMIN]: {
    permission: PermissionType.IS_ADMIN,
    id: 'b63a6f88-c690-454c-b4df-b48c01c833a9',
  },
  [PermissionType.ROOMS_VIEW]: {
    permission: PermissionType.ROOMS_VIEW,
    id: 'e309ff56-f928-407b-85af-b746c9fd5a04',
  },
  [PermissionType.GRAPHS_VIEW]: {
    permission: PermissionType.GRAPHS_VIEW,
    id: 'f71f60cd-ea56-4b61-b2c9-3fd511ddccd3',
  },
  [PermissionType.OPTIONS_VIEW]: {
    permission: PermissionType.OPTIONS_VIEW,
    id: 'c9f34045-8f60-4f08-a6bf-f925c7b5b6f0',
  },
  [PermissionType.SETTINGS_VIEW]: {
    permission: PermissionType.SETTINGS_VIEW,
    id: '7bcab30b-fb60-4d8c-acfd-66272690e330',
  },
  [PermissionType.DASHBOARD_VIEW]: {
    permission: PermissionType.DASHBOARD_VIEW,
    id: '26873420-12e4-4296-b992-d123862134ca',
  },
  [PermissionType.OPTIONS_ADD_ROLE]: {
    id: 'ac2524d4-0113-43c1-95fd-ff2cd3d624f0',
    permission: PermissionType.OPTIONS_ADD_ROLE,
  },
  [PermissionType.OPTIONS_ADD_ROOM]: {
    id: '062a37aa-ca1b-45cd-8831-a6dcdae364ec',
    permission: PermissionType.OPTIONS_ADD_ROOM,
  },
  [PermissionType.OPTIONS_ADD_USER]: {
    id: '4c0712f1-ac23-4d1e-ae04-920c582cc9f1',
    permission: PermissionType.OPTIONS_ADD_USER,
  },
  [PermissionType.OPTIONS_ADD_DEVICE]: {
    id: '2d62a8aa-71cd-4ad6-9b14-6585aab7ada0',
    permission: PermissionType.OPTIONS_ADD_DEVICE,
  },
  [PermissionType.OPTIONS_VIEW_ROLES]: {
    id: 'b1d54e33-da5f-49b5-978f-f69ba773f47e',
    permission: PermissionType.OPTIONS_VIEW_ROLES,
  },
  [PermissionType.OPTIONS_VIEW_ROOMS]: {
    id: '4b68647d-0059-4181-b14e-7fca25b384c6',
    permission: PermissionType.OPTIONS_VIEW_ROOMS,
  },
  [PermissionType.OPTIONS_VIEW_USERS]: {
    id: '01bd4ba2-da7b-4c60-ac44-7351dd44a55c',
    permission: PermissionType.OPTIONS_VIEW_USERS,
  },
  [PermissionType.OPTIONS_DELETE_ROLE]: {
    id: '2a52d9c0-a667-4c22-be5a-0c982afc8bac',
    permission: PermissionType.OPTIONS_DELETE_ROLE,
  },
  [PermissionType.OPTIONS_DELETE_ROOM]: {
    id: '9d632930-38ba-4c0c-a6b2-f6330bc34911',
    permission: PermissionType.OPTIONS_DELETE_ROOM,
  },
  [PermissionType.OPTIONS_DELETE_USER]: {
    id: 'ff924a11-4c28-43f8-b330-dbbdae92a381',
    permission: PermissionType.OPTIONS_DELETE_USER,
  },
  [PermissionType.OPTIONS_UPDATE_ROLE]: {
    id: '7b498dde-1c39-4031-a570-90b4f5e1706b',
    permission: PermissionType.OPTIONS_UPDATE_ROLE,
  },
  [PermissionType.OPTIONS_UPDATE_ROOM]: {
    id: '1cf1f28b-74cd-43ad-9808-0ccbd0ce0e6e',
    permission: PermissionType.OPTIONS_UPDATE_ROOM,
  },
  [PermissionType.OPTIONS_UPDATE_USER]: {
    id: '31214300-5e76-44b4-a5aa-7cf0107086b8',
    permission: PermissionType.OPTIONS_UPDATE_USER,
  },
  [PermissionType.OPTIONS_VIEW_DEVICES]: {
    id: 'f552403a-b85c-42ba-9e81-9d08877f2d79',
    permission: PermissionType.OPTIONS_VIEW_DEVICES,
  },
  [PermissionType.OPTIONS_DELETE_DEVICE]: {
    id: 'ea965585-0626-4c2e-93c4-495922eee735',
    permission: PermissionType.OPTIONS_DELETE_DEVICE,
  },
  [PermissionType.OPTIONS_UPDATE_DEVICE]: {
    id: '47cdfbe5-46cf-46da-a0e1-06d889abddd5',
    permission: PermissionType.OPTIONS_UPDATE_DEVICE,
  },
};

const adminPermissions: UserPermission[] = [
  {
    ...permissions.IS_ADMIN,
    roleId: '7ea0d03c-74d6-4d52-afd6-e314a5931554',
  },
];

const userPermissions: UserPermission[] = [
  {
    ...permissions.DASHBOARD_VIEW,
    roleId: '356143d8-a68b-418e-8fb5-2a70a9da025d',
  },
  {
    ...permissions.GRAPHS_VIEW,
    roleId: '356143d8-a68b-418e-8fb5-2a70a9da025d',
  },
  {
    ...permissions.ROOMS_VIEW,
    roleId: '356143d8-a68b-418e-8fb5-2a70a9da025d',
  },
  {
    ...permissions.OPTIONS_VIEW,
    roleId: '356143d8-a68b-418e-8fb5-2a70a9da025d',
  },
  {
    ...permissions.OPTIONS_VIEW_DEVICES,
    roleId: '356143d8-a68b-418e-8fb5-2a70a9da025d',
  },
  {
    ...permissions.OPTIONS_VIEW_ROOMS,
    roleId: '356143d8-a68b-418e-8fb5-2a70a9da025d',
  },
  {
    ...permissions.OPTIONS_VIEW_USERS,
    roleId: '356143d8-a68b-418e-8fb5-2a70a9da025d',
  },
  {
    ...permissions.OPTIONS_VIEW_ROLES,
    roleId: '356143d8-a68b-418e-8fb5-2a70a9da025d',
  },
  {
    ...permissions.SETTINGS_VIEW,
    roleId: '356143d8-a68b-418e-8fb5-2a70a9da025d',
  },
];

export const rolePermissions = [...adminPermissions, ...userPermissions];
