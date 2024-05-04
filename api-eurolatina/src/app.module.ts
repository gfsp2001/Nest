import { Module } from '@nestjs/common';
import { CONFIG_DATABASE } from './commons/infrastructure/config-database';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CONFIG_DATABASE(), UsersModule]
})
export class AppModule { }
