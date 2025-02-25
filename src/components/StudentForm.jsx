import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api.js';

function StudentForm() {
  const [student, setStudent] = useState({
    name: '',
    roleNumber: '',
    class: '',
    gender: '',
    marks: '',
  });
  const navigate = useNavigate();

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
      const post = await api.post('/student', studentData);
      alert(post.data.message);
      
    } catch (error) {
      console.error("Error creating student:", error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="number" name="roleNumber" placeholder="Roll Number" onChange={handleChange} required />
      <input type="number" name="class" placeholder="Class" onChange={handleChange} required />
      <input type="text" name="gender" placeholder="Gender" onChange={handleChange} required />
      <input type="number" name="marks" placeholder="Marks" onChange={handleChange} required />
      <button type="submit">Create Student</button>
    </form>
  );
}

export default StudentForm;