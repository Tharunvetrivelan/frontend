import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from './api.js';

function EditStudent() {
  const { id } = useParams();
  const [student, setStudent] = useState({ name: '', roleNumber: '', class: '', gender: '', marks: '' });
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/student/${id}`).then(response => setStudent(response.data.existingStudent));
  }, [id]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const studentData = {
        ...student,
        roleNumber: Number(student.roleNumber),
        class: Number(student.class),
        marks: Number(student.marks),
      };
      await api.put(`/student/${id}`, studentData);
      navigate('/home');
    } catch (error) {
      console.error("Error updating student:", error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={student.name} onChange={handleChange} required />
      <input type="number" name="roleNumber" value={student.roleNumber} onChange={handleChange} required />
      <input type="number" name="class" value={student.class} onChange={handleChange} required />
      <input type="text" name="gender" value={student.gender} onChange={handleChange} required />
      <input type="number" name="marks" value={student.marks} onChange={handleChange} required />
      <button type="submit">Update Student</button>
    </form>
  );
}

export default EditStudent; 