# 🎬 CinePedia

Rede social de filmes inspirada no Letterboxd, desenvolvida como projeto da disciplina de Angular. Permite explorar filmes, avaliar, comentar e salvar em listas pessoais.

## Tecnologias

- Angular 17+ (standalone components, signals, lazy loading)
- JSON-Server (backend fake)
- TMDB API (dados dos filmes)
- localStorage (sessão e persistência local)

## Funcionalidades

- Cadastro e login de usuários
- Listagem de filmes populares com paginação
- Filtros por gênero, ano de lançamento e avaliação mínima
- Busca de filmes por título
- Tela de detalhe com sinopse, diretor e nota do TMDB
- Avaliação com estrelas e comentários
- Adicionar filmes à lista pessoal
- Perfil com edição de nome e bio
- Rotas protegidas por autenticação

## Pré-requisitos

- Node.js instalado
- Angular CLI: `npm install -g @angular/cli`
- JSON-Server: `npm install -g json-server`

## Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/cinepedia.git
cd cinepedia
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie o JSON-Server

O JSON-Server simula o backend da aplicação. Deve rodar em paralelo com o Angular.

```bash
npx json-server db.json --port 3000
```

O backend ficará disponível em `http://localhost:3000`.

### 4. Inicie a aplicação Angular

Em outro terminal:

```bash
ng serve
```

Acesse em `http://localhost:4200`.

## Estrutura do db.json

O arquivo `db.json` na raiz do projeto contém os dados persistidos:

```json
{
  "avaliacoes": [],
  "usuarios": []
}
```

## Variáveis de ambiente

A API Key da TMDB está diretamente no `tmdb.services.ts`. Para usar sua própria chave, crie uma conta em [themoviedb.org](https://www.themoviedb.org/) e substitua o valor de `apiKey` no service.