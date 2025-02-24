import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from './api.js';

function StudentDetails() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    api.get(`/student/${id}`).then(response => setStudent(response.data.existingStudent));
  }, [id]);

  if (!student) return <p>Loading...</p>;

  return (
    <div>
      <h2>{student.name}</h2>
      <p>Roll Number: {student.roleNumber}</p>
      <p>Class: {student.class}</p>
      <p>Gender: {student.gender}</p>
      <p>Marks: {student.marks}</p>
    </div>
  );
}

export default StudentDetails;
