import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  // Esse método será chamado quando o módulo iniciar
  async onModuleInit() {
    await this.$connect(); // conecta ao banco
    console.log('Prisma connected');
  }

  // Esse método será chamado quando o módulo for destruído
  async onModuleDestroy() {
    await this.$disconnect(); // desconecta do banco
    console.log('Prisma disconnected');
  }
}
