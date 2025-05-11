import { useState, useEffect } from 'react';
import { Table, Button, Form, Alert, Card, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AnimalList.css';

function AnimalList() {
  const [animals, setAnimals] = useState([]);
  const [habitat, setHabitat] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
        const url = habitat ? `${baseURL}/api/animals?habitat=${encodeURIComponent(habitat)}` : `${baseURL}/api/animals`;
        console.log('URL da requisição:', url);
        const response = await axios.get(url);
        console.log('Animais recebidos:', JSON.stringify(response.data, null, 2));
        setAnimals(response.data);
        setError('');
      } catch (err) {
        console.error('Erro ao carregar animais:', err.response?.data);
        setError(err.response?.data?.error || 'Erro ao carregar animais');
      }
    };
    fetchAnimals();
  }, [habitat]);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este animal?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL || 'http://localhost:3000'}/api/animals/${id}`);
        setAnimals(animals.filter(animal => animal.id !== id));
        setError('');
      } catch (err) {
        setError(err.response?.data?.error || 'Erro ao excluir animal');
      }
    }
  };

  return (
    <Card className="p-4 shadow-sm">
      <h2 className="text-center mb-4">Lista de Animais</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row className="mb-4">
        <Col md={6} className="mx-auto">
          <Form.Group>
            <Form.Label>Filtrar por Habitat</Form.Label>
            <Form.Select
              value={habitat}
              onChange={(e) => setHabitat(e.target.value)}
              className="form-select-custom"
            >
              <option value="">Todos</option>
              <option value="Savana">Savana</option>
              <option value="Floresta">Floresta</option>
              <option value="Oceano">Oceano</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Table striped hover responsive className="table-custom">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Espécie</th>
            <th>Habitat</th>
            <th>País</th>
            <th>Cuidador</th>
            <th>Cuidados (Status e Cuidador)</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {animals.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">Nenhum animal encontrado</td>
            </tr>
          ) : (
            animals.map(animal => (
              <tr key={animal.id}>
                <td>{animal.name}</td>
                <td>{animal.species}</td>
                <td>{animal.habitat || '-'}</td>
                <td>{animal.country}</td>
                <td>{animal.caregiver ? animal.caregiver.name : 'Sem cuidador'}</td>
                <td>
                  {animal.cares?.length > 0 ? (
                    <ul>
                      {animal.cares.map(animalCare => (
                        <li key={`${animalCare.careId}-${animalCare.animalId}`}>
                          {animalCare.care.name} ({animalCare.status || 'Desconhecido'}) -{' '}
                          {animalCare.caregiver ? animalCare.caregiver.name : 'Sem cuidador'}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    'Nenhum cuidado vinculado'
                  )}
                </td>
                <td>
                  <Button
                    variant="outline-warning"
                    size="sm"
                    className="me-2"
                    onClick={() => navigate(`/edit/${animal.id}`)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(animal.id)}
                  >
                    Excluir
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Card>
  );
}

export default AnimalList;