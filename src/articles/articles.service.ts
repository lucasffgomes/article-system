import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Article } from './entities/article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  private articles: Article[] = [
    {
      id: 1,
      title: 'Como ficar rico',
      content: 'Só trabalhe muito.',
      createdBy: 'Lucas',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  findAll() {
    return this.articles;
  }

  findOne(id: number) {
    const article = this.articles.find((article) => article.id === id);

    if (!article)
      throw new HttpException('Esse artigo não existe', HttpStatus.NOT_FOUND);

    return article;
  }

  create(createArticleDto: CreateArticleDto) {
    const newId = this.articles.length + 1;

    const newArticle = {
      id: newId,
      ...createArticleDto,
      createdBy: 'Lucas',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.articles.push(newArticle);

    return newArticle;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    const articleIndex = this.articles.findIndex(
      (article) => article.id === id,
    );

    if (articleIndex < 0) {
      throw new HttpException('Esse artigo não existe', HttpStatus.NOT_FOUND);
    }

    const articleItem = this.articles[articleIndex];

    this.articles[articleIndex] = {
      ...articleItem,
      ...updateArticleDto,
    };

    return 'atualizado com sucesso';
  }

  delete(id: number) {
    const articleIndex = this.articles.findIndex(
      (article) => article.id === id,
    );

    if (articleIndex < 0) {
      throw new HttpException('Esse artigo não existe', HttpStatus.NOT_FOUND);
    }

    this.articles.splice(articleIndex, 1);

    return {
      message: 'Artigo excluído com sucesso',
    };
  }
}
