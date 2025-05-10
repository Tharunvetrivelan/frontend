import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from './api';
import { Button, Table, Space, Popconfirm, Input } from 'antd';
import '../css/home.css';

export default function Home() {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const limit = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const skip = (page - 1) * limit;
    const params = new URLSearchParams({
      skip: skip.toString(),
      limit: limit.toString(),
      ...(sortField && { sortField }),
      ...(sortOrder && { sortOrder }),
      ...(searchTerm && { search: searchTerm }),
    });
    const url = `/student?${params.toString()}`;
    console.log('Fetching:', url);
    api.get(url)
      .then(response => {
        console.log('Response:', response.data.studentData);
        setStudents(response.data.studentData);
        setTotalPages(Math.ceil(response.data.totalStudents / limit));
      })
      .catch(error => {
        console.error('Error:', error);
        setStudents([]); // Clear students on error
        setTotalPages(0); // Reset pagination
      });
  }, [page, sortField, sortOrder, searchTerm]);

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/student/${id}`);
      setStudents(prevStudents => prevStudents.filter(student => student._id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleSort = (field) => {
    console.log('Sorting by:', field, 'Current order:', sortOrder);
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
    setPage(1);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const columns = [
    {
      title: (
        <span onClick={() => handleSort('roleNumber')} style={{ cursor: 'pointer' }}>
          Roll Number {sortField === 'roleNumber' && (sortOrder === 'asc' ? '↑' : '↓')}
        </span>
      ),
      dataIndex: 'roleNumber',
      key: 'roleNumber',
      render: (text, record) => (
        <Link to={`/student/${record._id}`} className="student-link">
          {text}
        </Link>
      ),
    },
    {
      title: (
        <span onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
          Name {sortField === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
        </span>
      ),
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Link to={`/student/${record._id}`} className="student-link">
          {text}
        </Link>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle" className="student-table-actions">
          <Link to={`/edit-student/${record._id}`} className="edit-button">
            Edit
          </Link>
          <Popconfirm
            title="Are you sure you want to delete this student?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button className="delete-button" type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="home-container">
      <h1 style={{ placeSelf: 'center'}}>Welcome to the Home Page</h1>
      
      <header className="student-list-header">
        <h1>Orphan List</h1>
        <div className="button-group">
          <Input
            placeholder="Search by roll number or name"
            value={searchTerm}
            onChange={handleSearch}
            style={{ width: 200, marginRight: 10 }}
          />
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
          <Link to="/create-student" className="create-button">
            Create Student
          </Link>
        </div>
      </header>
      <Table
        columns={columns}
        dataSource={students}
        rowKey="_id"
        pagination={false}
        className="student-table"
        locale={{ emptyText: 'No students found' }} 
      />
      <div className="pagination">
        <Button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="page-button"
        >
          {'<'}
        </Button>
        <span className="page-text">Page {page} of {totalPages}</span>
        <Button
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="page-button"
        >
          {'>'}
        </Button>
      </div>
    </div>
  );
}