# senior-project

Projeto de estudo com frontend (React + TypeScript) e backend (Fastify + TypeScript + Prisma + PostgreSQL).

## Estrutura

- `web/` — frontend em React + TypeScript (Vite). Tela de login (usuário/senha, toast de erro) e home protegida mostrando o nome do usuário logado + botão de logout.
- `server/` — backend em Fastify + TypeScript + Prisma. Rotas `/login` (gera JWT) e `/me` (protegida, retorna o usuário autenticado).

## Banco de dados

A conexão já está montada em `server/.env`, mas o banco **não foi criado**:

```
DATABASE_URL="postgresql://docker:docker@localhost:5432/SENIOR-PROJECT_DB?schema=public"
```

Database: `SENIOR-PROJECT_DB` | user: `docker` | senha: `docker`.

Quando o PostgreSQL estiver disponível com esse banco, dentro de `server/`:

```bash
npm install
npx prisma migrate dev --name init
npm run prisma:seed   # cria o usuário admin / admin123
npm run dev
```

## Frontend

Dentro de `web/`:

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`, faça login com `admin` / `admin123` (após rodar o seed) e será redirecionado para a home com o nome do usuário e botão de logout.
