![Animal Care System Banner]([https://raw.githubusercontent.com/seu-usuario/seu-repositorio/main/assets/banner.png](https://ibb.co/JRggYJ0m))

🐾 Animal Care System


Um sistema web moderno para gerenciamento de animais, cuidados e cuidadores, projetado para ser intuitivo, escalável e fácil de usar.


🚀 Tecnologias Utilizadas

Backend

Node.js: Ambiente de execução JavaScript.
Express: Framework para APIs RESTful.
Prisma: ORM para interação com o banco de dados.
PostgreSQL: Banco de dados relacional.

Frontend

React: Interfaces dinâmicas e reativas.
Bootstrap: Design responsivo e moderno.
Axios: Comunicação com a API.

Outros

Git: Controle de versão.
GitHub: Hospedagem do código.
ESLint/Prettier: Qualidade de código.


📋 Pré-requisitos

Node.js (≥ 16.x)
PostgreSQL (configurado)
npm (gerenciador de pacotes)


⚙️ Configuração do Projeto
Backend

Navegue até a pasta backend: cd backend


Instale as dependências: npm install


Crie um arquivo .env na pasta backend com:DATABASE_URL="postgresql://username:password@localhost:5432/animal_care?schema=public"
PORT=5000


Nota: Substitua username, password e outros valores conforme sua configuração.


Execute as migrações do Prisma: npx prisma migrate dev --name init


Inicie o servidor: npm run dev



Frontend

Navegue até a pasta frontend: cd frontend


Instale as dependências: npm install


Inicie o servidor de desenvolvimento: npm run start


Acesse em http://localhost:3000.




🛠️ Funcionalidades

🐘 Gerenciamento de Animais: Cadastro, listagem, edição e remoção.
🩺 Gerenciamento de Cuidados: Registro e acompanhamento de cuidados.
👷 Gerenciamento de Cuidadores: Administração de informações.
🔍 Filtros Avançados: Filtragem por habitat ou outras características.
📱 Interface Intuitiva: Design responsivo com Bootstrap.
🔒 API Segura: Endpoints REST com validações.
✅ Feedback ao Usuário: Notificações claras para ações.


📂 Estrutura do Projeto
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



🐞 Solução de Problemas

Erro de conexão com o banco: Verifique o PostgreSQL e as credenciais no .env.
Porta em uso: Altere o PORT no .env ou libere a porta.
Dependências não instaladas: Execute npm install nas pastas backend e frontend.
