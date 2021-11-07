import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from './casl-ability.factory';
import { PermissionGuard } from './casl.guard';
@Module({
  providers: [CaslAbilityFactory, PermissionGuard],
  exports: [CaslAbilityFactory, PermissionGuard],
})
export class CaslModule {}