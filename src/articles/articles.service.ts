import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  async findAll() {
    const allArticles = await this.articleRepository.find();
    return allArticles;
  }

  async findOne(id: number) {
    const article = await this.articleRepository.findOne({
      where: { id },
    });

    if (article?.title) return article;

    throw new HttpException('Esse artigo não existe', HttpStatus.NOT_FOUND);
  }

  async create(createArticleDto: CreateArticleDto) {
    const newArticle = this.articleRepository.create({
      title: createArticleDto.title,
      content: createArticleDto.content,
      createdBy: createArticleDto.createdBy,
    });

    return await this.articleRepository.save(newArticle);
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    const findArticle = await this.articleRepository.findOne({
      where: { id },
    });

    if (!findArticle) {
      throw new HttpException('Esse artigo não existe', HttpStatus.NOT_FOUND);
    }

    await this.articleRepository.update(id, updateArticleDto);
    return await this.articleRepository.findOne({ where: { id } });
  }

  async delete(id: number) {
    const findArticle = await this.articleRepository.findOne({
      where: { id },
    });

    if (!findArticle) {
      throw new HttpException('Esse artigo não existe', HttpStatus.NOT_FOUND);
    }

    await this.articleRepository.delete(id);

    return {
      message: 'Artigo excluído',
    };
  }
}
