import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  /**
   * Retorna todos os usuários.
   */
  @Get()
  findAllUsers() {
    return this.userService.findAll();
  }

  /**
   * Retorna um usuário específico pelo ID.
   */
  @Get(':id')
  findOneUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
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
