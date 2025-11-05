import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/users/users.module';
import { ArticlesModule } from 'src/articles/articles.module';
import { PermissionsModule } from 'src/permissions/permissions.module';
import { AuthModule } from 'src/auth/auth.module';
import { Article } from '../articles/entities/article.entity';
import { User } from '../users/entities/user.entity';
import { Permission } from '../permissions/entities/permission.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'prisma/database.db',
      entities: [Article, User, Permission],
      synchronize: true, // Em produção, usar migrations
    }),
    PermissionsModule,
    AuthModule,
    UserModule,
    ArticlesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
