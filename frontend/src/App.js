import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navbar from './components/Navbar';
import AnimalList from './components/AnimalList';
import AnimalForm from './components/AnimalForm';
import AnimalEdit from './components/AnimalEdit';
import CareList from './components/CareList';
import CareForm from './components/CareForm';
import CareEdit from './components/CareEdit';
import './styles/index.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Container className="my-5 app-container">
        <Routes>
          <Route path="/" element={<AnimalList />} />
          <Route path="/create" element={<AnimalForm />} />
          <Route path="/edit/:id" element={<AnimalEdit />} />
          <Route path="/cares" element={<CareList />} />
          <Route path="/care/create" element={<CareForm />} />
          <Route path="/care/edit/:id" element={<CareEdit />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;