import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from './api';
import { Button, Table, Space, Popconfirm } from 'antd';
import '../css/home.css'; // Keep your custom CSS for styling

export default function Home() {
    const [students, setStudents] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/student?skip=${(page - 1) * limit}&limit=${limit}`)
            .then(response => {
                setStudents(response.data.studentData);
                setTotalPages(Math.ceil(response.data.totalStudents / limit));
            })
            .catch(error => console.error(error));
    }, [page]);

    const handleLogout = () => {
        Cookies.remove("token");
        navigate("/login");
    };

    const handleDelete = async (id) => {
        
            try {
                await api.delete(`/student/${id}`);
                setStudents(prevStudents => prevStudents.filter(student => student._id !== id));
            } catch (error) {
                console.error("Error deleting student:", error);
            }
        
    };

    const columns = [
        {
            title: 'Roll Number',
            dataIndex: 'roleNumber',
            key: 'roleNumber',
            render: (text, record) => (
                <Link to={`/student/${record._id}`} className="student-link">
                    {text}
                </Link>
            ),
        },
        {
            title: 'Name',
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
            <h1 style={{placeSelf:'center',marginTop:'30px'}}>Welcome to the Home Page</h1>
            <br></br>
            <header className="student-list-header">
                <h1>Student List</h1>
                <div className="button-group">
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