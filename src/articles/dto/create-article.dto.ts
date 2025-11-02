import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateArticleDto {
  @IsString({ message: 'O título precisa ser um texto' })
  @MinLength(5, { message: 'O título precisa ter pelo menos 5 caracteres' })
  @IsNotEmpty()
  readonly title: string;

  @IsString({ message: 'O conteúdo do artigo precisa ser um texto' })
  @MinLength(5, {
    message: 'O conteúdo do artigo precisa ter pelo menos 5 caracteres',
  })
  @IsNotEmpty()
  readonly content: string;
  
  @IsString()
  @IsNotEmpty()
  readonly createdBy: string;
}
