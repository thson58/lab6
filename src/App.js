import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row, Button, Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

const initialStudents = [
  {
    id: 1,
    name: 'Nguyen Van A',
    code: 'CODE12345',
    status: 'Active',
    selected: true,
  },
  {
    id: 2,
    name: 'Tran Van B',
    code: 'CODE67890',
    status: 'In-active',
    selected: false,
  }
];

function App() {
  const [students, setStudents] = useState(initialStudents);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [isActive, setIsActive] = useState(false);

  const clearHandler = () => {
    setStudents([]);
  };

  const addStudentHandler = () => {
    if (!name || !code) return;

    const newStudent = {
      id: students.length + 1,
      name: name,
      code: code,
      status: isActive ? 'Active' : 'In-active',
      selected: false,
    };

    setStudents([newStudent, ...students]);
    setName('');
    setCode('');
    setIsActive(false);
  };

  const deleteStudentHandler = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const toggleSelectHandler = (id) => {
    setStudents(students.map(student => 
      student.id === id ? { ...student, selected: !student.selected } : student
    ));
  };

  const totalSelected = students.filter(student => student.selected).length;

  return (
    <Container style={{ marginTop: '20px' }}>
      <Row style={{ marginBottom: '20px' }}>
        <Col>
          <h5>Total Selected Student: {totalSelected}</h5>
        </Col>
        <Col style={{ textAlign: 'right' }}>
          <Button variant="primary" onClick={clearHandler}>Clear</Button>
        </Col>
      </Row>
      <Row style={{ marginBottom: '20px' }}>
        <Col>
          <Form.Control 
            type="text" 
            placeholder="Student Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            style={{ marginBottom: '10px' }}
          />
          <Form.Control 
            type="text" 
            placeholder="Student Code" 
            value={code} 
            onChange={(e) => setCode(e.target.value)} 
            style={{ marginBottom: '10px' }} 
          />
          <Form.Check
            inline
            label="Still Active"
            type={'checkbox'}
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)} 
          />
        </Col>
        <Col style={{ textAlign: 'right' }}>
          <Button variant="primary" onClick={addStudentHandler}>Add</Button>
        </Col>
      </Row>
      <Row style={{ marginBottom: '20px' }}> 
        <Col>Select</Col>
        <Col>Student Name</Col>
        <Col>Student Code</Col>
        <Col>Status</Col>
        <Col>Action</Col>
      </Row>
      {students.map((item) => (
        <Row key={item.id} style={{ marginBottom: '10px' }}>
          <Col>
            <Form.Check
              inline 
              checked={item.selected} 
              type={'checkbox'}
              id={`inline-${item.id}`} 
              onChange={() => toggleSelectHandler(item.id)} 
            />
          </Col>
          <Col>{item.name}</Col>
          <Col>{item.code}</Col>
          <Col>
            <Button variant={item.status === 'Active' ? 'success' : 'danger'}>
              {item.status}
            </Button>
          </Col>
          <Col>
            <Button variant="danger" onClick={() => deleteStudentHandler(item.id)}>Delete</Button>
          </Col>
        </Row>
      ))}
    </Container>
  );
}

export default App;
