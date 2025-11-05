import {
  HttpException,
  HttpStatus,
  Injectable,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Permission } from '../permissions/entities/permission.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async findAll() {
    return await this.userRepository.find({
      relations: ['permissions'],
      select: ['id', 'name', 'email', 'createdAt', 'updatedAt', 'permissions'],
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['permissions'],
      select: ['id', 'name', 'email', 'createdAt', 'updatedAt', 'permissions'],
    });

    if (!user) {
      throw new HttpException('Esse usuário não existe', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      relations: ['permissions'],
    });
  }

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email já está em uso');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser = this.userRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(newUser);
    const { password, ...result } = savedUser;
    return result;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['permissions'],
    });

    if (!user) {
      throw new HttpException('Esse usuário não existe', HttpStatus.NOT_FOUND);
    }

    // Atualizar campos básicos
    const updateData: any = {};
    if (updateUserDto.name) {
      updateData.name = updateUserDto.name;
    }
    if (updateUserDto.email) {
      // Verificar se o email já está em uso por outro usuário
      const existingUser = await this.userRepository.findOne({
        where: { email: updateUserDto.email },
      });
      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('Email já está em uso');
      }
      updateData.email = updateUserDto.email;
    }
    if (updateUserDto.password) {
      updateData.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    if (Object.keys(updateData).length > 0) {
      await this.userRepository.update(id, updateData);
    }

    // Atualizar permissões se fornecido
    if (updateUserDto.permissionIds !== undefined) {
      if (updateUserDto.permissionIds.length === 0) {
        // Se array vazio, remove todas as permissões
        user.permissions = [];
      } else {
        // Busca as permissões pelos IDs fornecidos
        const permissions = await this.permissionRepository.find({
          where: updateUserDto.permissionIds.map((id) => ({ id })),
        });
        user.permissions = permissions;
      }
      await this.userRepository.save(user);
    }

    // Retornar usuário atualizado
    const updatedUser = await this.userRepository.findOne({
      where: { id },
      relations: ['permissions'],
      select: ['id', 'name', 'email', 'createdAt', 'updatedAt', 'permissions'],
    });

    return updatedUser;
  }

  async delete(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new HttpException('Esse usuário não existe', HttpStatus.NOT_FOUND);
    }

    await this.userRepository.delete(id);

    return {
      message: 'Usuário excluído',
    };
  }
}
