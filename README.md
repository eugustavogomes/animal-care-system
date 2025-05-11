Animal Care System
Um sistema web robusto e intuitivo para gerenciamento de animais, cuidados e cuidadores, desenvolvido com tecnologias modernas para garantir escalabilidade, desempenho e uma ótima experiência de usuário.
Tecnologias Utilizadas
Backend

Node.js: Ambiente de execução JavaScript para o servidor.
Express: Framework para construção de APIs RESTful.
Prisma: ORM para interação simplificada com o banco de dados.
PostgreSQL: Banco de dados relacional robusto.

Frontend

React: Biblioteca JavaScript para interfaces dinâmicas e reativas.
Bootstrap: Framework CSS para design responsivo e moderno.
Axios: Cliente HTTP para comunicação com a API.

Outros

Git: Controle de versão.
GitHub: Hospedagem do código-fonte.
ESLint e Prettier: Ferramentas para padronização e qualidade de código.

Pré-requisitos

Node.js: Versão >= 16.x
PostgreSQL: Banco de dados configurado
npm: Gerenciador de pacotes do Node.js

Configuração do Projeto
Backend

Navegue até a pasta do backend:cd backend


Instale as dependências:npm install


Crie um arquivo .env na raiz da pasta backend com as seguintes variáveis:DATABASE_URL="postgresql://username:password@localhost:5432/animal_care?schema=public"
PORT=5000

Substitua username, password e outros valores conforme sua configuração do PostgreSQL.
Execute as migrações do Prisma para configurar o banco de dados:npx prisma migrate dev --name init


Inicie o servidor em modo de desenvolvimento: npm run dev



Frontend

Navegue até a pasta do frontend: cd frontend


Instale as dependências: npm install


Inicie o servidor de desenvolvimento: npm run start

O frontend estará disponível em http://localhost:3000.

Funcionalidades

Gerenciamento de Animais: Cadastro, listagem, edição e remoção de animais.
Gerenciamento de Cuidados: Registro e acompanhamento de cuidados associados aos animais.
Gerenciamento de Cuidadores: Administração de informações dos cuidadores.
Filtros Avançados: Filtragem de animais por habitat ou outras características.
Interface Intuitiva: Design responsivo e acessível com Bootstrap.
API REST Segura: Endpoints com validações e respostas padronizadas.
Feedback ao Usuário: Notificações claras para ações realizadas.

Estrutura do Projeto
animal-care-system/
├── backend/
│   ├── prisma/
│   ├── src/
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md

Solução de Problemas

Erro de conexão com o banco de dados: Verifique se o PostgreSQL está ativo e se as credenciais no .env estão corretas.
Porta em uso: Altere a variável PORT no .env ou libere a porta padrão.
Dependências não instaladas: Execute npm install nas pastas backend e frontend.
