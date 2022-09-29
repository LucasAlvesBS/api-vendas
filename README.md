# Sobre

Este projeto tem como objetivo criar uma API de um pequeno e-commerce, contendo entidades de usuários, produtos e pedidos.

# Time

- Desenvolvedor: Lucas Alves ([Linkedin](https://www.linkedin.com/in/lucas-alves-090524225/))
- Instrutor: Jorge Aluizio ([Udemy](https://www.udemy.com/course/api-restful-de-vendas/))

# Bibliotecas

- "cors": "^2.8.5"
- "dotenv": "^16.0.2"
- "errors": "^0.3.0"
- "express": "^4.18.1"
- "express-async": "^0.1.3"
- "pg": "^8.8.0"
- "reflect-metadata": "^0.1.13"
- "typeorm": "^0.2.29"

# Como rodar

Inicialmente, clone o repositório:

```bash
$ git clone https://github.com/LucasAlvesBS/api-vendas.git
```

Para rodar a aplicação, é necessário ter um banco de dados criado. No software do Postgres, selecione a opção
de "Criar SCRIPT", digite "CREATE DATABASE <nome-do-banco-de-dados>;" e pressione a tecla "F5" para realizar
a operação.

Feito isso, rode o seguinte comando no terminal para instalar as dependências necessárias:

```bash
$ npm install
```

Antes de rodar a aplicação, gere as migrations:

```bash
$ npm run typeorm migration:run
```

Para reverter a última migration, faça:

```bash
$ npm run typeorm migration:revert
```

Finalmente, execute o comando abaixo para rodar a API:

```bash
$ npm run dev
```

# Tecnologias

- Express
- JWT
- NodeJS
- Postgres
- Postman
- TypeORM
- TypeScript

# Variáveis de Ambiente

Na raiz do projeto, consta um arquivo ".env.example", que exibe todas as variáveis de ambiente necessárias. Para rodar a aplicação, altere o nome do arquivo para ".env" e preencha as variáveis com os seus respectivos valores.

# Regras de Negócio

- Usuários não cadastrados

Podem apenas acessar a página de cadastro para criar uma conta e visualizar as produtos dispoíveis.

- Usuários autenticados

Podem atualizar o perfil e excluí-lo. Além disso, podem realizar compras e visualizar seu histórico de pedidos.

- Admins

Podem realizar qualquer ação na API.

- Produtos

Devem ser adicionados apenas por admins.

# Links

- [Express](https://expressjs.com/pt-br/)
- [JWT](https://jwt.io/)
- [NodeJS](https://nodejs.org/en/docs/)
- [Postgres](https://www.postgresql.org/docs/)
- [Postman](https://www.postman.com/)
- [TypeORM](https://typeorm.io/)
- [TypeScript](https://www.typescriptlang.org/docs/)
