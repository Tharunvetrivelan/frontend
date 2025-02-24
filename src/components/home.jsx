import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from './api'; 
import '../css/home.css';

export default function Home() {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Initialize totalPages state
  const limit = 10;
  const navigate = useNavigate();

  // Fetch students when the page changes
  useEffect(() => {
    api.get(`/student?skip=${(page - 1) * limit}&limit=${limit}`)
      .then(response => {
        setStudents(response.data.studentData);
        setTotalPages(Math.ceil(response.data.totalStudents / limit)); // Update totalPages
      })
      .catch(error => console.error(error));
  }, [page]);

  // Handle logout
  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  // Handle student deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await api.delete(`/student/${id}`);
        setStudents(prevStudents => prevStudents.filter(student => student._id !== id));
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
      <nav>
        <Link to="/create-student" className="create-button">Create Student</Link>
      </nav>
      <h1>Student List</h1>
      <table>
        <thead>
          <tr>
            <th>Roll Number</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id}>
              <td>
                <Link to={`/student/${student._id}`}>{student.roleNumber}</Link>
              </td>
              <td>
                <Link to={`/student/${student._id}`}>{student.name}</Link>
              </td>
              <td>
                <Link to={`/edit-student/${student._id}`}>Edit</Link>
                <button onClick={() => handleDelete(student._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}>
          {'<'}
        </button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>
          {'>'}
        </button>
      </div>
    </div>
  );
}