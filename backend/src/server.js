const express = require('express');
const cors = require('cors');
const animalRoutes = require('./routes/animalRoutes');
const careRoutes = require('./routes/careRoutes');
const cargiverRoutes = require('./routes/caregiverRoutes');
require('dotenv').config();

const app = express();

app.use(cors( ));
app.use(express.json());

app.use('/api/animals', animalRoutes);
app.use('/api/cares', careRoutes);
app.use('/api/caregivers', cargiverRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});