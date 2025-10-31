import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user';
import { UpdateUserDto } from './dto/update-user';

@Controller('users')
export class UsersController {
  //   constructor(private readonly usersService: UsersService) {}

  /**
   * Retorna todos os usuários.
   */
  @Get()
  getAll() {
    // Aqui você chamaria o service: return this.usersService.findAll();
    return [];
  }

  /**
   * Retorna um usuário específico pelo ID.
   */
  @Get(':id')
  findOneById(@Param('id') id: string) {
    // return this.usersService.findOneById(id);
    return id;
  }

  /**
   * Cria um novo usuário.
   */
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    // return this.usersService.create(createUserDto);
    return 'User criado';
  }

  /**
   * Atualiza um usuário existente.
   */
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    // return this.usersService.update(id, updateUserDto);
    return `Usuário ${id} atualizado`;
  }

  /**
   * Deleta um usuário.
   */
  @Delete(':id')
  delete(@Param('id') id: string) {
    // return this.usersService.remove(id);
    return `Usuário ${id} deletado`;
  }
}
