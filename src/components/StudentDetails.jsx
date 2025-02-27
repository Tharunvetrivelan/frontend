import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from './api.js';
import { Card, Layout, Typography, Spin } from 'antd';
import '../css/studentDetails.css';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

function StudentDetails() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/student/${id}`)
      .then(response => {
        setStudent(response.data.existingStudent);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Spin size="large" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#141414' }} />;

  if (!student) return <p style={{ color: '#ffffff', backgroundColor: '#141414', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Student not found</p>;

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#141414' }}>
      <Content style={{ padding: '48px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card
          title={<Title level={1} style={{ color: '#ffffff', textAlign: 'center', fontSize: '2.5rem' }}>{student.name}</Title>}
          style={{
            width: '100%',
            maxWidth: '800px',
            backgroundColor: '#1e2a3a',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
            border: '2px solid #1890ff',
            color: '#ffffff',
            padding: '40px',
          }}
          className="student-details-card"
        >
          <Paragraph style={{ color: '#b0b0b0', fontSize: '1.5rem', marginBottom: '24px' }}>Roll Number: {student.roleNumber}</Paragraph>
          <Paragraph style={{ color: '#b0b0b0', fontSize: '1.5rem', marginBottom: '24px' }}>Class: {student.class}</Paragraph>
          <Paragraph style={{ color: '#b0b0b0', fontSize: '1.5rem', marginBottom: '24px' }}>Gender: {student.gender}</Paragraph>
          <Paragraph style={{ color: '#b0b0b0', fontSize: '1.5rem', marginBottom: '24px' }}>Marks: {student.marks}</Paragraph>
        </Card>
      </Content>
    </Layout>
  );
}

export default StudentDetails;