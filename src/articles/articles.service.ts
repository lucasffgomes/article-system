import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Article } from './entities/article.entity';

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

  findOne(id: string) {
    const article = this.articles.find((article) => article.id === Number(id));

    if (!article)
      throw new HttpException('Esse artigo não existe', HttpStatus.NOT_FOUND);

    return article;
  }

  create(body: any) {
    const newId = this.articles.length + 1;

    const newArticle = {
      id: newId,
      ...body,
    };

    this.articles.push(newArticle);

    return newArticle;
  }

  update(id: string, body: any) {
    const articleIndex = this.articles.findIndex(
      (article) => article.id === Number(id),
    );

    if (articleIndex < 0) {
      throw new HttpException('Esse artigo não existe', HttpStatus.NOT_FOUND);
    }

    const articleItem = this.articles[articleIndex];

    this.articles[articleIndex] = {
      ...articleItem,
      ...body,
    };

    return 'atualizado com sucesso';
  }

  delete(id: string) {
    const articleIndex = this.articles.findIndex(
      (article) => article.id === Number(id),
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
