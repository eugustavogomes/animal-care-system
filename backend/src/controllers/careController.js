const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllCares = async (req, res) => {
  try {
    console.log('Buscando todos os cuidados...');
    const cares = await prisma.care.findMany({
      include: {
        animals: {
          include: {
            animal: { include: { caregiver: true } },
            caregiver: true,
          },
        },
      },
    });
    console.log('Cuidados encontrados:', cares.length);
    res.status(200).json(cares);
  } catch (error) {
    console.error('Erro ao buscar cuidados:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      meta: error.meta,
    });
    res.status(500).json({ error: 'Erro ao buscar cuidados', details: error.message });
  }
};

const getCareById = async (req, res) => {
  const { id } = req.params;
  try {
    console.log('Buscando cuidado com ID:', id);
    const care = await prisma.care.findUnique({
      where: { id: parseInt(id) },
      include: {
        animals: {
          include: {
            animal: { include: { caregiver: true } },
            caregiver: true,
          },
        },
      },
    });
    if (!care) {
      console.log('Cuidado não encontrado:', id);
      return res.status(404).json({ error: 'Cuidado não encontrado' });
    }
    res.status(200).json(care);
  } catch (error) {
    console.error('Erro ao buscar cuidado:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      meta: error.meta,
    });
    res.status(500).json({ error: 'Erro ao buscar cuidado', details: error.message });
  }
};

const createCare = async (req, res) => {
  const { name, description, frequency, animalCareAssignments } = req.body;
  try {
    console.log('Criando cuidado:', { name });
    const care = await prisma.care.create({
      data: {
        name,
        description,
        frequency,
        animals: {
          create: animalCareAssignments?.map(assignment => ({
            animal: { connect: { id: parseInt(assignment.animalId) } },
            caregiver: assignment.caregiverId ? { connect: { id: parseInt(assignment.caregiverId) } } : undefined,
            status: assignment.status || 'Em andamento',
          })) || [],
        },
      },
      include: {
        animals: {
          include: {
            animal: { include: { caregiver: true } },
            caregiver: true,
          },
        },
      },
    });
    console.log('Cuidado criado:', care.id);
    res.status(201).json(care);
  } catch (error) {
    console.error('Erro ao criar cuidado:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      meta: error.meta,
    });
    res.status(500).json({ error: 'Erro ao criar cuidado', details: error.message });
  }
};

const updateCare = async (req, res) => {
  const { id } = req.params;
  const { name, description, frequency, animalCareAssignments } = req.body;
  try {
    console.log('Atualizando cuidado:', { id, name });
    const care = await prisma.care.findUnique({ where: { id: parseInt(id) } });
    if (!care) {
      console.log('Cuidado não encontrado:', id);
      return res.status(404).json({ error: 'Cuidado não encontrado' });
    }

    const updatedCare = await prisma.care.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        frequency,
        animals: {
          deleteMany: {},
          create: animalCareAssignments?.map(assignment => ({
            animal: { connect: { id: parseInt(assignment.animalId) } },
            caregiver: assignment.caregiverId ? { connect: { id: parseInt(assignment.caregiverId) } } : undefined,
            status: assignment.status || 'Em andamento',
          })) || [],
        },
      },
      include: {
        animals: {
          include: {
            animal: { include: { caregiver: true } },
            caregiver: true,
          },
        },
      },
    });
    console.log('Cuidado atualizado:', updatedCare.id);
    res.status(200).json(updatedCare);
  } catch (error) {
    console.error('Erro ao atualizar cuidado:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      meta: error.meta,
    });
    res.status(500).json({ error: 'Erro ao atualizar cuidado', details: error.message });
  }
};

const deleteCare = async (req, res) => {
  const { id } = req.params;
  const careId = parseInt(id);
  if (isNaN(careId)) {
    console.error('ID inválido:', id);
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    console.log('Deletando cuidado:', careId);
    const care = await prisma.care.findUnique({ where: { id: careId } });
    if (!care) {
      console.log('Cuidado não encontrado:', careId);
      return res.status(404).json({ error: 'Cuidado não encontrado' });
    }

    await prisma.animalCareAssignment.deleteMany({
      where: { careId: careId },
    });
    console.log('Registros de AnimalCareAssignment deletados para careId:', careId);

    await prisma.care.delete({ where: { id: careId } });
    console.log('Cuidado deletado com sucesso:', careId);
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar cuidado:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      meta: error.meta,
    });
    res.status(500).json({ error: 'Erro ao deletar cuidado', details: error.message });
  }
};

module.exports = { getAllCares, getCareById, createCare, updateCare, deleteCare };