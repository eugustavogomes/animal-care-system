const express = require('express');
const cors = require('cors');
const animalRoutes = require('./routes/animalRoutes');
const careRoutes = require('./routes/careRoutes');
const cargiverRoutes = require('./routes/caregiverRoutes');
require('dotenv').config();

const app = express();

const allowedOrigins = [
  'http://localhost:3001', // Frontend local
  'https://animal-care-system-2hlkzt4e1-gustavos-projects-7498fade.vercel.app' // Frontend no Vercel
];

app.use(cors({
  origin: (origin, callback) => {
    // Permite requisições sem origem (ex.: Postman) ou se a origem estiver na lista
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use('/api/animals', animalRoutes);
app.use('/api/cares', careRoutes);
app.use('/api/caregivers', cargiverRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});