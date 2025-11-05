# Article System API

Sistema de gerenciamento de artigos e usuários com autenticação JWT e controle de permissões baseado em roles.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Executando o Projeto](#executando-o-projeto)
- [Docker](#docker)
- [Testando com Insomnia](#-testando-com-insomnia)
- [API Endpoints](#api-endpoints)
- [Autenticação](#autenticação)
- [Permissões](#permissões)

## 🎯 Sobre o Projeto

Article System é uma API REST desenvolvida em NestJS que permite o gerenciamento de artigos e usuários com sistema completo de autenticação e autorização baseado em JWT e controle de permissões por roles.

O sistema possui três níveis de permissão:

- **Admin**: Pode gerenciar artigos e usuários (CRUD completo)
- **Editor**: Pode gerenciar artigos (CRUD completo)
- **Reader**: Pode apenas ler artigos

## ✨ Funcionalidades

- ✅ Autenticação JWT
- ✅ Sistema de permissões baseado em roles
- ✅ CRUD completo de usuários
- ✅ CRUD completo de artigos
- ✅ Hash de senhas com bcrypt
- ✅ Validação de dados com class-validator
- ✅ Seed automático de permissões e usuário root
- ✅ Relacionamento Many-to-Many entre usuários e permissões

## 🛠 Tecnologias

- **NestJS** - Framework Node.js
- **TypeORM** - ORM para TypeScript
- **SQLite** - Banco de dados
- **JWT** - Autenticação por tokens
- **bcrypt** - Hash de senhas
- **class-validator** - Validação de DTOs
- **Passport** - Autenticação middleware
- **TypeScript** - Linguagem de programação

## 📦 Pré-requisitos

Antes de começar, você precisa ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **Docker** e **Docker Compose** (opcional, para rodar com Docker)

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd article-system
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` e configure as variáveis:

```env
PORT=3000
DATABASE_URL="file:./prisma/database.db"
JWT_SECRET="seu-secret-key-aqui-mude-em-producao"
```

> ⚠️ **Importante**: Em produção, altere o `JWT_SECRET` para uma chave segura e aleatória.

## ⚙️ Configuração

O projeto usa SQLite como banco de dados. O arquivo `database.db` será criado automaticamente na pasta `prisma/` quando a aplicação iniciar.

As permissões e o usuário root são criados automaticamente via seed na inicialização:

- **Permissões criadas**:
  - `admin` - Permissão para administrar artigos e usuários
  - `editor` - Permissão para administrar artigos
  - `reader` - Permissão para apenas ler artigos

- **Usuário root criado**:
  - Email: `root@admin.com`
  - Senha: `root123`
  - Permissão: `admin`

## 🏃 Executando o Projeto

### Modo Desenvolvimento

```bash
npm run start:dev
```

A aplicação estará disponível em `http://localhost:3000`

### Modo Produção

```bash
# Build do projeto
npm run build

# Iniciar em produção
npm run start:prod
```

## 🐳 Docker

### Executando com Docker Compose

1. Certifique-se de ter o Docker e Docker Compose instalados

2. Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

3. Execute o Docker Compose:

```bash
docker-compose up --build
```

Ou para rodar em background:

```bash
docker-compose up -d --build
```

4. Para parar os containers:

```bash
docker-compose down
```

5. Para ver os logs:

```bash
docker-compose logs -f
```

### Executando apenas com Dockerfile

```bash
# Build da imagem
docker build -t article-system .

# Executar container
docker run -p 3000:3000 --env-file .env article-system
```

## 🧪 Testando com Insomnia

Este projeto inclui uma coleção completa do Insomnia para facilitar os testes da API.

### Como importar a coleção

1. Abra o **Insomnia** (ou instale em [insomnia.rest](https://insomnia.rest/))

2. Clique em **Application** → **Preferences** → **Data** → **Import Data**

3. Selecione **From File** e escolha o arquivo `insomnia-collection` da raiz do projeto

4. Ou arraste e solte o arquivo `insomnia-collection` diretamente no Insomnia

### Configurando variáveis de ambiente

Após importar a coleção, configure as variáveis de ambiente no Insomnia:

1. Clique em **Manage Environments** (no canto superior direito)

2. Configure as seguintes variáveis:
   - `base_url`: `http://localhost:3000`
   - `token`: (será preenchido automaticamente após fazer login)

### Usando a coleção

A coleção inclui todas as rotas da API organizadas por categorias:

- **Auth**: Login e autenticação
- **Articles**: CRUD completo de artigos
- **Users**: CRUD completo de usuários

**Dica**: Primeiro execute a requisição de login (`Auth → Login`) para obter o token. O token será automaticamente salvo na variável `token` e usado nas demais requisições.

## 🔌 API Endpoints

### Autenticação

#### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "root@admin.com",
  "password": "root123"
}
```

**Resposta:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Root Admin",
    "email": "root@admin.com",
    "permissions": ["admin"]
  }
}
```

### Usuários (Requer autenticação Admin)

```http
GET    /users          # Listar todos os usuários
GET    /users/:id      # Buscar usuário por ID
POST   /users          # Criar novo usuário
PUT    /users/:id      # Atualizar usuário
DELETE /users/:id      # Deletar usuário
```

**Exemplo - Criar usuário:**

```http
POST /users
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Exemplo - Atualizar usuário com permissões:**

```http
PUT /users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "João Silva",
  "permissionIds": [2, 3]  // IDs das permissões (editor e reader)
}
```

### Artigos

```http
GET    /articles          # Listar todos os artigos (Admin, Editor, Reader)
GET    /articles/:id      # Buscar artigo por ID (Admin, Editor, Reader)
POST   /articles          # Criar novo artigo (Admin, Editor)
PATCH  /articles/:id      # Atualizar artigo (Admin, Editor)
DELETE /articles/:id      # Deletar artigo (Admin, Editor)
```

**Exemplo - Criar artigo:**

```http
POST /articles
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Meu Primeiro Artigo",
  "content": "Conteúdo do artigo aqui..."
}
```

> ⚠️ O campo `createdBy` é preenchido automaticamente com o ID do usuário autenticado.

## 🔐 Autenticação

Todas as rotas (exceto `/auth/login`) requerem autenticação via token JWT.

Para autenticar uma requisição, inclua o token no header:

```http
Authorization: Bearer <seu_token_jwt>
```

O token expira em **24 horas**.

## 👥 Permissões

### Níveis de Permissão

| Permissão  | Descrição              | Ações Permitidas                             |
| ---------- | ---------------------- | -------------------------------------------- |
| **admin**  | Administrador completo | CRUD de artigos e usuários                   |
| **editor** | Editor de artigos      | CRUD de artigos (apenas leitura de usuários) |
| **reader** | Leitor                 | Apenas leitura de artigos                    |

### Proteção de Rotas

- **Artigos**:
  - `GET /articles` - Admin, Editor, Reader
  - `GET /articles/:id` - Admin, Editor, Reader
  - `POST /articles` - Admin, Editor
  - `PATCH /articles/:id` - Admin, Editor
  - `DELETE /articles/:id` - Admin, Editor

- **Usuários**:
  - Todas as rotas requerem permissão `admin`

## 📝 Exemplos de Uso

### 1. Fazer login e obter token

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "root@admin.com",
    "password": "root123"
  }'
```

### 2. Criar um artigo

```bash
curl -X POST http://localhost:3000/articles \
  -H "Authorization: Bearer <seu_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Meu Artigo",
    "content": "Conteúdo do artigo"
  }'
```

### 3. Listar artigos

```bash
curl -X GET http://localhost:3000/articles \
  -H "Authorization: Bearer <seu_token>"
```

### 4. Atualizar permissões de um usuário

```bash
curl -X PUT http://localhost:3000/users/2 \
  -H "Authorization: Bearer <seu_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "permissionIds": [2, 3]
  }'
```

## 🐛 Troubleshooting

### Erro de banco de dados

Se o banco de dados não for criado automaticamente, certifique-se de que a pasta `prisma/` existe e tem permissões de escrita.

## 👨‍💻 Autor

Desenvolvido por lucasffgomes.
