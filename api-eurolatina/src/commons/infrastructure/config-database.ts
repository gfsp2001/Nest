import { TypeOrmModule } from '@nestjs/typeorm';
export const CONFIG_DATABASE = () =>
	TypeOrmModule.forRoot({
		type: 'postgres',
		host: 'localhost',
		port: 5432,
		username: 'postgres',
		password: '2587734',
		database: 'qas',
		autoLoadEntities: true
	});