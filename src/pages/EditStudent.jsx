import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, message } from "antd";
import api from "./api.js";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm(); 

  useEffect(() => {
    api.get(`/student/${id}`)
      .then(response => {
        const studentData = response.data.existingStudent;
        form.setFieldsValue(studentData); 
      })
      .catch(error => message.error("Error fetching student details!"));
  }, [id, form]);

  const handleSubmit = async (values) => {
    try {
      const studentData = {
        ...values,
        name: values.name.trim(),
        gender: values.gender.trim().toLowerCase(),
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
        form={form} 
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
  label="Name"
  name="name"
  rules={[
    { required: true, message: "Name is required" },
    {
      validator: (_, value) =>
        value && value.trim()
          ? Promise.resolve()
          : Promise.reject(new Error("Name cannot be empty or spaces only")),
    },
  ]}
>
  <Input />
</Form.Item>

<Form.Item
  label="Roll Number"
  name="roleNumber"
  rules={[
    { required: true, message: "Roll Number is required" },
    {
      validator: (_, value) =>
        value && Number(value) >= 0
          ? Promise.resolve()
          : Promise.reject(new Error("Roll Number must be a non-negative number")),
    },
  ]}
>
  <Input type="number" />
</Form.Item>


<Form.Item
  label="Class"
  name="class"
  rules={[
    { required: true, message: "Class is required" },
    {
      validator: (_, value) =>
        value && Number(value) >= 1 && Number(value) <= 12
          ? Promise.resolve()
          : Promise.reject(new Error("Class must be between 1 and 12")),
    },
  ]}
>
  <Input type="number" />
</Form.Item>

<Form.Item
  label="Gender"
  name="gender"
  rules={[
    { required: true, message: "Gender is required" },
    {
      validator: (_, value) =>
        value && ["male", "female"].includes(value.toLowerCase())
          ? Promise.resolve()
          : Promise.reject(new Error("Gender must be Male or Female")),
    },
  ]}
>
  <Input />
</Form.Item>

<Form.Item
  label="Marks"
  name="marks"
  rules={[
    { required: true, message: "Marks are required" },
    {
      validator: (_, value) =>
        value && Number(value) >= 0 && Number(value) <= 500
          ? Promise.resolve()
          : Promise.reject(new Error("Marks must be between 0 and 500")),
    },
  ]}
>
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
