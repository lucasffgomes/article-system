import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const allArticles = await this.prisma.article.findMany();
    return allArticles;
  }

  async findOne(id: number) {
    const article = await this.prisma.article.findFirst({
      where: {
        id: id,
      },
    });

    if (article?.title) return article;

    throw new HttpException('Esse artigo não existe', HttpStatus.NOT_FOUND);
  }

  async create(createArticleDto: CreateArticleDto) {
    const newArticle = await this.prisma.article.create({
      data: {
        title: createArticleDto.title,
        content: createArticleDto.content,
        createdBy: createArticleDto.createdBy,
      },
    });

    return newArticle;
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    const findArticle = await this.prisma.article.findFirst({
      where: {
        id: id,
      },
    });

    if (!findArticle) {
      throw new HttpException('Esse artigo não existe', HttpStatus.NOT_FOUND);
    }

    const article = await this.prisma.article.update({
      where: {
        id: findArticle.id,
      },
      data: updateArticleDto,
    });

    return article;
  }

  async delete(id: number) {
    const findArticle = await this.prisma.article.findFirst({
      where: {
        id: id,
      },
    });

    if (!findArticle) {
      throw new HttpException('Esse artigo não existe', HttpStatus.NOT_FOUND);
    }

    await this.prisma.article.delete({
      where: {
        id: findArticle.id,
      },
    });

    return {
      message: 'Artigo excluído',
    }
  }
}
