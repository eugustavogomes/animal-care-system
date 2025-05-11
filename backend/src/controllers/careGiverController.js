const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllCaregivers = async (req, res) => {
  try {
    const caregivers = await prisma.caregiver.findMany();
    res.status(200).json(caregivers);
  } catch (error) {
    console.error('Erro ao buscar cuidadores:', error);
    res.status(500).json({ error: 'Erro ao buscar cuidadores' });
  }
};

const createCaregiver = async (req, res) => {
  const { name, email } = req.body;
  try {
    const caregiver = await prisma.caregiver.create({
      data: { name, email },
    });
    res.status(201).json(caregiver);
  } catch (error) {
    console.error('Erro ao criar cuidador:', error);
    res.status(500).json({ error: 'Erro ao criar cuidador' });
  }
};

module.exports = { getAllCaregivers, createCaregiver };