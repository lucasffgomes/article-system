import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    await this.seedPermissions();
    await this.seedRootUser();
  }

  async seedPermissions() {
    const permissions = [
      { name: 'admin', description: 'Permissão para administrar artigos e usuários' },
      { name: 'editor', description: 'Permissão para administrar artigos' },
      { name: 'reader', description: 'Permissão para apenas ler artigos' },
    ];

    for (const perm of permissions) {
      const existingPermission = await this.permissionRepository.findOne({
        where: { name: perm.name },
      });

      if (!existingPermission) {
        await this.permissionRepository.save(perm);
        console.log(`Permissão "${perm.name}" criada`);
      }
    }
  }

  async seedRootUser() {
    const rootEmail = 'root@admin.com';
    const existingRoot = await this.userRepository.findOne({
      where: { email: rootEmail },
      relations: ['permissions'],
    });

    if (!existingRoot) {
      const adminPermission = await this.permissionRepository.findOne({
        where: { name: 'admin' },
      });

      if (adminPermission) {
        const hashedPassword = await bcrypt.hash('root123', 10);
        const rootUser = this.userRepository.create({
          name: 'Root Admin',
          email: rootEmail,
          password: hashedPassword,
          permissions: [adminPermission],
        });

        await this.userRepository.save(rootUser);
        console.log('Usuário root criado: root@admin.com / root123');
      }
    }
  }
}

