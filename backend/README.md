# Desafio Medicar - API Backend

Esta é a **API RESTful** para o desafio **Medicar**, um sistema para gestão de **consultas e agendas médicas**.

A aplicação é **100% containerizada** com **Docker** e **Docker Compose**, permitindo uma inicialização rápida e isolada, sem necessidade de instalar dependências localmente.

---

## Tecnologias Utilizadas

- **Node.js** (executado dentro do Docker)
- **NestJS** – Framework progressivo para construção de APIs escaláveis
- **PostgreSQL** – Banco de dados relacional
- **TypeORM** – ORM para integração com o banco de dados
- **Docker & Docker Compose** – Containerização da aplicação e banco
- **Class-Validator** – Validação de DTOs e regras de negócio

---

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

- [Git](https://git-scm.com/downloads)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/) *(geralmente já vem com o Docker Desktop)*

---

## Instalação e Execução

### 1. Clonar o Repositório

```bash
git clone https://github.com/guilhermepls/desafio-intmed.git
cd desafio-intmed/backend
```

---

### 2. Configure variáveis de ambiente

- Adicione essas informações em um arquivo .env, *(dentro de desafio-intmed/backend)*: 

```bash
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=intmed_db
NODE_ENV=development
```

---

### 3. Suba os containers com Docker Compose

```bash
docker-compose up --build
```

- Isso irá baixar as dependências, iniciar o banco de dados e a API em modo de desenvolvimento (`localhost:3000` por padrão).

---

### 4. Acesse a API

Por padrão, o backend estará disponível em:

```
http://localhost:3000
```

---

Você agora está pronto para usar a API Medicar para cadastrar **especialidades, médicos, agendas** e **realizar consultas**!

---

### Endpoints da API

| Método | Rota | Descrição |
| :------ | :---- | :---------- |
| **GET** | `/especialidades` | Lista todas as especialidades |
| **POST** | `/especialidades` | Cria uma nova especialidade |
| **GET** | `/medicos` | Lista todos os médicos (com filtro opcional `?especialidadeId=`) |
| **POST** | `/medicos` | Cria um novo médico |
| **POST** | `/agendas` | Cria uma nova agenda para um médico |
| **GET** | `/agendas` | Lista agendas disponíveis com filtros (`medico`, `crm`, `data_inicio`, `data_final`) |
| **POST** | `/consultas` | Marca uma nova consulta |
| **GET** | `/consultas` | Lista todas as consultas futuras |
| **DELETE** | `/consultas/:id` | Desmarca uma consulta |