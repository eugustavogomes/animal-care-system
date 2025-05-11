Animal Care System
Sistema web para gerenciamento de animais e cuidados, desenvolvido com Node.js, Express, Prisma, PostgreSQL, React e Bootstrap.
Tecnologias Utilizadas

Backend: Node.js, Express, Prisma, PostgreSQL
Frontend: React, Bootstrap, Axios
Outros: Git, GitHub

Requisitos

Node.js (>= 16.x)
PostgreSQL
npm

Configuração
Backend

Navegue até a pasta backend: cd backend


Instale as dependências:npm install


Configure o arquivo .env com a URL do banco de dados:DATABASE_URL="postgresql://username:password@localhost:5432/animal_care?schema=public"
PORT=5000


Execute as migrações do Prisma:npx prisma migrate dev --name init


Inicie o servidor:npm run dev



Frontend

Navegue até a pasta frontend:cd frontend


Instale as dependências:npm install


Inicie o servidor de desenvolvimento: npm start



Funcionalidades

Cadastro, listagem, atualização e remoção de animais, cuidados e cuidadores.
Filtro por habitat na listagem de animais.
Interface amigável com Bootstrap.
API REST com validações.
