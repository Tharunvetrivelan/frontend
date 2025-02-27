import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, message } from "antd";
import api from "./api.js";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm(); // ✅ Hook to control form values

  useEffect(() => {
    api.get(`/student/${id}`)
      .then(response => {
        const studentData = response.data.existingStudent;
        form.setFieldsValue(studentData); // ✅ Update form values when data is fetched
      })
      .catch(error => message.error("Error fetching student details!"));
  }, [id, form]);

  const handleSubmit = async (values) => {
    try {
      const studentData = {
        ...values,
        roleNumber: Number(values.roleNumber),
        class: Number(values.class),
        marks: Number(values.marks),
      };
      await api.put(`/student/${id}`, studentData);
      message.success("Student updated successfully!");
      navigate("/home");
    } catch (error) {
      message.error("Error updating student!");
    }
  };

  return (
    <Card title="Edit Student" style={{ width: 400, margin: "50px auto" }}>
      <Form 
        form={form} // ✅ Bind form to state
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Roll Number" name="roleNumber" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Class" name="class" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Gender" name="gender" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Marks" name="marks" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          Update Student
        </Button>
      </Form>
    </Card>
  );
}

export default EditStudent;
