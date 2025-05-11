const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllAnimals = async (req, res) => {
  try {
    console.log('Buscando todos os animais...');
    const { habitat } = req.query;

const animals = await prisma.animal.findMany({
  where: habitat ? { habitat: { equals: habitat } } : {},
  include: {
    caregiver: true,
    cares: {
      include: {
        care: true,
        caregiver: true,
      },
    },
  },
});


    console.log('Animais encontrados:', animals.length);
    res.status(200).json(animals);
  } catch (error) {
    console.error('Erro ao buscar animais:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      meta: error.meta,
    });
    res.status(500).json({ error: 'Erro ao buscar animais', details: error.message });
  }
};

const getAnimalById = async (req, res) => {
  const { id } = req.params;
  try {
    console.log('Buscando animal com ID:', id);
    const animal = await prisma.animal.findUnique({
      where: { id: parseInt(id) },
      include: {
        cares: { include: { care: true, caregiver: true } },
        caregiver: true,
      },
    });
    if (!animal) {
      console.log('Animal não encontrado:', id);
      return res.status(404).json({ error: 'Animal não encontrado' });
    }
    res.status(200).json(animal);
  } catch (error) {
    console.error('Erro ao buscar animal:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      meta: error.meta,
    });
    res.status(500).json({ error: 'Erro ao buscar animal', details: error.message });
  }
};

const createAnimal = async (req, res) => {
  const { name, description, birthDate, species, habitat, country, caregiverId, newCaregiverName } = req.body;

  // Validação básica
  if (!name) {
    return res.status(400).json({ error: 'O campo nome é obrigatório' });
  }

  try {
    console.log('Criando animal:', { name, caregiverId, newCaregiverName });
    let finalCaregiverId = caregiverId ? parseInt(caregiverId) : null;

    if (newCaregiverName && !caregiverId) {
      const caregiver = await prisma.caregiver.create({
        data: {
          name: newCaregiverName,
          
        },
      });
      finalCaregiverId = caregiver.id;
      console.log('Novo cuidador criado:', caregiver.id);
    }

    const animal = await prisma.animal.create({
      data: {
        name,
        description: description || null, // Tratar undefined como null
        birthDate: birthDate ? new Date(birthDate) : null,
        species: species || null,
        habitat: habitat || null,
        country: country || null,
        caregiver: finalCaregiverId ? { connect: { id: finalCaregiverId } } : undefined,
      },
      include: { caregiver: true },
    });
    console.log('Animal criado:', animal.id);
    res.status(201).json(animal);
  } catch (error) {
    console.error('Erro ao criar animal:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      meta: error.meta,
    });
    res.status(500).json({ error: 'Erro ao criar animal', details: error.message });
  }
};

const updateAnimal = async (req, res) => {
  const { id } = req.params;
  const { name, description, birthDate, species, habitat, country, caregiverId, newCaregiverName } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'O campo nome é obrigatório' });
  }

  try {
    console.log('Atualizando animal:', { id, name, caregiverId, newCaregiverName });
    const animal = await prisma.animal.findUnique({ where: { id: parseInt(id) } });
    if (!animal) {
      console.log('Animal não encontrado:', id);
      return res.status(404).json({ error: 'Animal não encontrado' });
    }

    let finalCaregiverId = caregiverId ? parseInt(caregiverId) : null;

    if (newCaregiverName && !caregiverId) {
      const caregiver = await prisma.caregiver.create({
        data: {
          name: newCaregiverName,
          email: `${newCaregiverName.toLowerCase().replace(/\s+/g, '')}@example.com`,
        },
      });
      finalCaregiverId = caregiver.id;
      console.log('Novo cuidador criado:', caregiver.id);
    }

    const updatedAnimal = await prisma.animal.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description: description || null,
        birthDate: birthDate ? new Date(birthDate) : null,
        species: species || null,
        habitat: habitat || null,
        country: country || null,
        caregiver: finalCaregiverId ? { connect: { id: finalCaregiverId } } : { disconnect: true },
      },
      include: { caregiver: true },
    });
    console.log('Animal atualizado:', updatedAnimal.id);
    res.status(200).json(updatedAnimal);
  } catch (error) {
    console.error('Erro ao atualizar animal:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      meta: error.meta,
    });
    res.status(500).json({ error: 'Erro ao atualizar animal', details: error.message });
  }
};

const deleteAnimal = async (req, res) => {
  const { id } = req.params;

  // Validação do ID
  const parsedId = parseInt(id);
  if (isNaN(parsedId) || parsedId <= 0) {
    console.error('ID inválido:', id);
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    console.log('Deletando animal com ID:', parsedId);

    // Verificar se o animal existe
    const animal = await prisma.animal.findUnique({
      where: { id: parsedId },
      include: { cares: true, caregiver: true }, // Incluir relações para depuração
    });
    if (!animal) {
      console.log('Animal não encontrado:', parsedId);
      return res.status(404).json({ error: 'Animal não encontrado' });
    }
    console.log('Animal encontrado:', animal);

    // Deletar registros associados em AnimalCareAssignment
    const deletedAssignments = await prisma.animalCareAssignment.deleteMany({
      where: { animalId: parsedId },
    });
    console.log('Registros de AnimalCareAssignment deletados:', deletedAssignments.count);

    // Deletar o animal
    await prisma.animal.delete({
      where: { id: parsedId },
    });
    console.log('Animal deletado com sucesso:', parsedId);

    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar animal:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      meta: error.meta,
    });
    res.status(500).json({ error: 'Erro ao deletar animal', details: error.message });
  }
};

module.exports = { getAllAnimals, getAnimalById, createAnimal, updateAnimal, deleteAnimal };