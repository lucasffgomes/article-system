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
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

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
  createArticle(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  @Patch(':id')
  updateArticle(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.articleService.update(id, updateArticleDto);
  }

  @Delete(':id')
  deleteArticle(@Param('id') id: string) {
    return this.articleService.delete(id);
  }
}
