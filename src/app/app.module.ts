import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/users/users.module';
import { ArticlesModule } from 'src/articles/articles.module';

@Module({
  imports: [UserModule, ArticlesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
