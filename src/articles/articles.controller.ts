import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articleService: ArticlesService) {}

  @Get()
  findAllArticles() {
    return this.articleService.findAll();
  }

  @Get(':id')
  findOneArticle(@Param('id') id: string) {
    return this.articleService.findOne(id);
  }

  @Post()
  createArticle(@Body() body: any) {
    return this.articleService.create(body);
  }

  @Patch(':id')
  updateArticle(@Param('id') id: string, @Body() body: any) {
    return this.articleService.update(id, body);
  }

  @Delete(':id')
  deleteArticle(@Param('id') id: string) {
    return this.articleService.delete(id);
  }
}
