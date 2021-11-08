import { applyDecorators, UseGuards } from '@nestjs/common';
import { PermissionGuard } from '../casl.guard';

export const Authorize = (): any => {
  return applyDecorators(UseGuards(PermissionGuard));
};