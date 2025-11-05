import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('articles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ArticlesController {
  constructor(private readonly articleService: ArticlesService) {}

  @Get()
  @Roles('admin', 'editor', 'reader')
  findAllArticles() {
    return this.articleService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'editor', 'reader')
  findOneArticle(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.findOne(id);
  }

  @Post()
  @Roles('admin', 'editor')
  createArticle(
    @Body() createArticleDto: CreateArticleDto,
    @CurrentUser() user: any,
  ) {
    return this.articleService.create(createArticleDto, user.userId);
  }

  @Patch(':id')
  @Roles('admin', 'editor')
  updateArticle(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.articleService.update(id, updateArticleDto);
  }

  @Delete(':id')
  @Roles('admin', 'editor')
  deleteArticle(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.delete(id);
  }
}
