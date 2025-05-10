import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import InfiniteScroll from 'react-infinite-scroll-component';
import api from './api';
import { Button, Space, Popconfirm, Card } from 'antd';
import '../css/infiniteScroll.css';

export default function INFINITESCROLL() {
  const [dataSource, setDataSource] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const pageSize = 20;
  const [page, setPage] = useState(0);

  useEffect(() => {
    // Initial fetch for first 20 elements
    fetchMoreData();
  }, []);

  const fetchMoreData = async () => {
    try {
      const response = await api.get(`/student/paginated?page=${page}&limit=${pageSize}`);
      const newStudents = response.data.studentData;
      const total = response.data.totalStudents;

      setTimeout(() => {
        setDataSource((prevData) => [...prevData, ...newStudents]);
        setHasMore(dataSource.length + newStudents.length < total);
        setPage((prevPage) => prevPage + 1);
      }, 500);
    } catch (error) {
      console.error('Error fetching students:', error);
      setHasMore(false);
    }
  };

  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/');
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/student/${id}`);
      setDataSource((prevData) => prevData.filter((student) => student._id !== id));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div className="infinite-container">
      <h1 style={{ placeSelf: 'center', marginTop: '30px' }}>Infinite Scroll Student List</h1>
      <header>
  <div className='header'>
    <h1>Student List</h1>
    <div className="button-container">
      <button onClick={handleLogout} className="logout-button">Logout</button>
      <Link to="/create-student" className="create-button">Create Student</Link>
    </div>
  </div>
</header>

      <InfiniteScroll
        dataLength={dataSource.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<p style={{ textAlign: 'center' }}>Loading...</p>}
      >
        <div className='grid-layout'>
        {dataSource.map((student, index) => (
          <div key={student._id}>
            <Space direction='vertical'>
              <Card>
              <Link to={`/student/${student._id}`} className="rollnumber">
              <span>Roll Number {student.roleNumber}</span>
              <span>Name {student.name}</span>
              </Link>
              <br/>
              <div className='editor-container'>
              <Link to={`/edit-student/${student._id}`} className="edit-button">
                Edit
              </Link>
              <Popconfirm
                title="Are you sure you want to delete this student?"
                onConfirm={() => handleDelete(student._id)}
                okText="Yes"
                cancelText="No"
              >
                <Button className="delete-button" type="link" danger>
                  Delete
                </Button>
              </Popconfirm>
              </div>
              </Card>
             
              <br></br>
            </Space>
          </div>
        
        ))}
       </div>
      </InfiniteScroll>
    </div>
  );
}