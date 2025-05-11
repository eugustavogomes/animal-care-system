import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Alert, Card, Col, Row, Form as BootstrapForm } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AnimalForm.css';

function AnimalForm() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [caregivers, setCaregivers] = useState([]);
  const navigate = useNavigate();

  // Carregar cuidadores
  useEffect(() => {
    const fetchCaregivers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:3000'}/api/caregivers`);
        setCaregivers(response.data);
      } catch (err) {
        setError('Erro ao carregar cuidadores');
      }
    };
    fetchCaregivers();
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().min(2, 'Mínimo 2 caracteres').required('Obrigatório'),
    species: Yup.string().required('Obrigatório'),
    habitat: Yup.string().required('Obrigatório'),
    country: Yup.string().required('Obrigatório'),
    birthDate: Yup.date().required('Obrigatório'),
    caregiverId: Yup.number().nullable(),
    newCaregiverName: Yup.string().when('caregiverId', {
      is: (caregiverId) => !caregiverId,
      then: (schema) => schema.optional(),
      otherwise: (schema) => schema.nullable(),
    }),
  });

  return (
    <Card className="p-4 shadow-sm">
      <h2 className="text-center mb-4">Criar Animal</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Formik
        initialValues={{
          name: '',
          description: '',
          species: '',
          habitat: '',
          country: '',
          birthDate: '',
          caregiverId: '',
          newCaregiverName: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            // Se caregiverId for vazio, limpar o campo
            if (!values.caregiverId) {
              values.caregiverId = null;
            }
            await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:3000'}/api/animals`, values);
            setSuccess('Animal criado com sucesso!');
            setError('');
            setTimeout(() => navigate('/'), 2000);
          } catch (err) {
            setError(err.response?.data?.error || 'Erro ao criar animal');
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
                  <label htmlFor="name" className="form-label">Nome</label>
                  <Field name="name" className="form-control form-control-custom" />
                  <div className="text-danger mt-1">
                    <ErrorMessage name="name" />
                  </div>
                </div>
              </Col>
              <Col md={6} sm={12}>
                <div className="mb-3">
                  <label htmlFor="species" className="form-label">Espécie</label>
                  <Field name="species" className="form-control form-control-custom" />
                  <div className="text-danger mt-1">
                    <ErrorMessage name="species" />
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={6} sm={12}>
                <div className="mb-3">
                  <label htmlFor="habitat" className="form-label">Habitat</label>
                  <Field as="select" name="habitat" className="form-control form-control-custom">
                    <option value="">Selecione</option>
                    <option value="Savana">Savana</option>
                    <option value="Floresta">Floresta</option>
                    <option value="Oceano">Oceano</option>
                  </Field>
                  <div className="text-danger mt-1">
                    <ErrorMessage name="habitat" />
                  </div>
                </div>
              </Col>
              <Col md={6} sm={12}>
                <div className="mb-3">
                  <label htmlFor="country" className="form-label">País</label>
                  <Field name="country" className="form-control form-control-custom" />
                  <div className="text-danger mt-1">
                    <ErrorMessage name="country" />
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={6} sm={12}>
                <div className="mb-3">
                  <label htmlFor="birthDate" className="form-label">Data de Nascimento</label>
                  <Field type="date" name="birthDate" className="form-control form-control-custom" />
                  <div className="text-danger mt-1">
                    <ErrorMessage name="birthDate" />
                  </div>
                </div>
              </Col>
              <Col md={6} sm={12}>
                <div className="mb-3">
                  <label htmlFor="caregiverId" className="form-label">Cuidador Existente</label>
                  <Field
                    as="select"
                    name="caregiverId"
                    className="form-control form-control-custom"
                    onChange={(e) => {
                      setFieldValue('caregiverId', e.target.value);
                      setFieldValue('newCaregiverName', ''); // Limpar newCaregiverName se selecionar existente
                    }}
                  >
                    <option value="">Nenhum</option>
                    {caregivers.map(caregiver => (
                      <option key={caregiver.id} value={caregiver.id}>
                        {caregiver.name}
                      </option>
                    ))}
                  </Field>
                  <div className="text-danger mt-1">
                    <ErrorMessage name="caregiverId" />
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={6} sm={12}>
                <div className="mb-3">
                  <label htmlFor="newCaregiverName" className="form-label">Novo Cuidador (Nome)</label>
                  <Field
                    name="newCaregiverName"
                    className="form-control form-control-custom"
                    disabled={!!values.caregiverId} // Desabilitar se caregiverId estiver selecionado
                    onChange={(e) => {
                      setFieldValue('newCaregiverName', e.target.value);
                      setFieldValue('caregiverId', ''); // Limpar caregiverId se digitar novo nome
                    }}
                  />
                  <div className="text-danger mt-1">
                    <ErrorMessage name="newCaregiverName" />
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
            <div className="text-center mt-4">
              <Button
                type="submit"
                variant="dark"
                disabled={isSubmitting}
                className="btn-custom px-5"
              >
                Criar
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Card>
  );
}

export default AnimalForm;