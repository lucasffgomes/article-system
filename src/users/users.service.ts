import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async findAll() {
    const allUsers = await this.prisma.user.findMany();
    return allUsers;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    if (user?.email) return user;

    throw new HttpException('Esse usuário não existe', HttpStatus.NOT_FOUND);
  }
}
