import { useState, useEffect } from 'react';
import { Table, Button, Alert, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/CareList.css';

function CareList() {
  const [cares, setCares] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCares = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:3000'}/api/cares`);
        setCares(response.data);
        setError('');
      } catch (err) {
        setError(err.response?.data?.error || 'Erro ao carregar cuidados');
      }
    };
    fetchCares();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este cuidado?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL || 'http://localhost:3000'}/api/cares/${id}`);
        setCares(cares.filter(care => care.id !== id));
        setError('');
      } catch (err) {
        setError(err.response?.data?.error || 'Erro ao excluir cuidado');
      }
    }
  };

  return (
    <Card className="p-4 shadow-sm">
      <h2 className="text-center mb-4">Lista de Cuidados</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped hover responsive className="table-custom">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Frequência</th>
            <th>Animais Vinculados</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {cares.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">Nenhum cuidado encontrado</td>
            </tr>
          ) : (
            cares.map(care => (
              <tr key={care.id}>
                <td>{care.name}</td>
                <td>{care.description || '-'}</td>
                <td>{care.frequency}</td>
                <td>
                  {care.animals?.length > 0
                    ? care.animals.map(animalCare => animalCare.animal.name).join(', ')
                    : 'Nenhum animal vinculado'}
                </td>
                <td>
                  <Button
                    variant="outline-warning"
                    size="sm"
                    className="me-2"
                    onClick={() => navigate(`/care/edit/${care.id}`)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(care.id)}
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

export default CareList;