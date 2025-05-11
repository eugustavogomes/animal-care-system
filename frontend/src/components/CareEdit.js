import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Alert, Card, Col, Row, Form as BootstrapForm } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './CareForm.js';

function CareEdit() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [animals, setAnimals] = useState([]);
  const [caregivers, setCaregivers] = useState([]);
  const [initialValues, setInitialValues] = useState({
    name: '',
    description: '',
    frequency: '',
    animalCareAssignments: [],
  });
  const navigate = useNavigate();
  const { id } = useParams();

  // Carregar cuidado, animais e cuidadores
  useEffect(() => {
    const fetchCare = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:3000'}/api/cares/${id}`);
        setInitialValues({
          name: response.data.name,
          description: response.data.description || '',
          frequency: response.data.frequency,
          animalCareAssignments: response.data.animals.map(animalCare => ({
            animalId: animalCare.animal.id,
            caregiverId: animalCare.caregiver?.id || animalCare.animal.caregiver?.id || '',
            status: animalCare.status,
          })),
        });
      } catch (err) {
        setError('Erro ao carregar cuidado');
      }
    };

    const fetchAnimals = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:3000'}/api/animals`);
        setAnimals(response.data);
      } catch (err) {
        setError('Erro ao carregar animais');
      }
    };

    const fetchCaregivers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:3000'}/api/caregivers`);
        setCaregivers(response.data);
      } catch (err) {
        setError('Erro ao carregar cuidadores');
      }
    };

    fetchCare();
    fetchAnimals();
    fetchCaregivers();
  }, [id]);

  const validationSchema = Yup.object({
    name: Yup.string().min(2, 'Mínimo 2 caracteres').required('Obrigatório'),
    frequency: Yup.string().required('Obrigatório'),
    animalCareAssignments: Yup.array().of(
      Yup.object({
        animalId: Yup.number().required('Obrigatório'),
        caregiverId: Yup.number().nullable(),
        status: Yup.string().oneOf(['Em andamento', 'Concluído']).required('Obrigatório'),
      })
    ).optional(),
  });

  return (
    <Card className="p-4 shadow-sm">
      <h2 className="text-center mb-4">Editar Cuidado</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await axios.put(`${process.env.REACT_APP_API_URL || 'http://localhost:3000'}/api/cares/${id}`, values);
            setSuccess('Cuidado atualizado com sucesso!');
            setError('');
            setTimeout(() => navigate('/cares'), 2000);
          } catch (err) {
            setError(err.response?.data?.error || 'Erro ao atualizar cuidado');
            setSuccess('');
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <Row>
              <Col md={6} sm={12}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Nome do Cuidado</label>
                  <Field name="name" className="form-control form-control-custom" />
                  <div className="text-danger mt-1">
                    <ErrorMessage name="name" />
                  </div>
                </div>
              </Col>
              <Col md={6} sm={12}>
                <div className="mb-3">
                  <label htmlFor="frequency" className="form-label">Frequência</label>
                  <Field as="select" name="frequency" className="form-control form-control-custom">
                    <option value="">Selecione</option>
                    <option value="diária">Diária</option>
                    <option value="semanal">Semanal</option>
                    <option value="mensal">Mensal</option>
                    <option value="anual">Anual</option>
                  </Field>
                  <div className="text-danger mt-1">
                    <ErrorMessage name="frequency" />
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Descrição</label>
                  <Field as="textarea" name="description" className="form-control form-control-custom" rows="4" />
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <div className="mb-3">
                  <label className="form-label">Vincular Animais e Cuidadores</label>
                  {animals.map((animal, index) => (
                    <div key={animal.id} className="mb-2 p-3 border rounded">
                      <BootstrapForm.Check
                        label={`${animal.name} (${animal.species})`}
                        checked={values.animalCareAssignments.some(a => a.animalId === animal.id)}
                        onChange={(e) => {
                          const assignments = [...values.animalCareAssignments];
                          if (e.target.checked) {
                            assignments.push({
                              animalId: animal.id,
                              caregiverId: animal.caregiver?.id || '',
                              status: 'Em andamento',
                            });
                          } else {
                            const idx = assignments.findIndex(a => a.animalId === animal.id);
                            if (idx !== -1) assignments.splice(idx, 1);
                          }
                          setFieldValue('animalCareAssignments', assignments);
                        }}
                      />
                      {values.animalCareAssignments.some(a => a.animalId === animal.id) && (
                        <div className="mt-2">
                          <BootstrapForm.Group>
                            <BootstrapForm.Label>Cuidador</BootstrapForm.Label>
                            <BootstrapForm.Select
                              value={values.animalCareAssignments.find(a => a.animalId === animal.id)?.caregiverId || ''}
                              onChange={(e) => {
                                const assignments = [...values.animalCareAssignments];
                                const idx = assignments.findIndex(a => a.animalId === animal.id);
                                assignments[idx].caregiverId = e.target.value ? parseInt(e.target.value) : '';
                                setFieldValue('animalCareAssignments', assignments);
                              }}
                            >
                              <option value="">Nenhum</option>
                              {caregivers.map(caregiver => (
                                <option key={caregiver.id} value={caregiver.id}>
                                  {caregiver.name}
                                </option>
                              ))}
                            </BootstrapForm.Select>
                          </BootstrapForm.Group>
                          <BootstrapForm.Group className="mt-2">
                            <BootstrapForm.Label>Status</BootstrapForm.Label>
                            <BootstrapForm.Select
                              value={values.animalCareAssignments.find(a => a.animalId === animal.id)?.status || 'Em andamento'}
                              onChange={(e) => {
                                const assignments = [...values.animalCareAssignments];
                                const idx = assignments.findIndex(a => a.animalId === animal.id);
                                assignments[idx].status = e.target.value;
                                setFieldValue('animalCareAssignments', assignments);
                              }}
                            >
                              <option value="Em andamento">Em andamento</option>
                              <option value="Concluído">Concluído</option>
                            </BootstrapForm.Select>
                          </BootstrapForm.Group>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
            <div className="text-center mt-4">
              <Button
                type="submit"
                variant="dark"
                disabled={isSubmitting}
                className="btn-custom px-5"
              >
                Salvar
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Card>
  );
}

export default CareEdit;