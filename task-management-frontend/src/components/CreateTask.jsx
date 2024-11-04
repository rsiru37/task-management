import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from "axios"
import { BACKEND_URL } from '../config';

export const CreateTask = ({isOpen, onClose}) => {
    const [users, setusers] = useState([]);
    // const [submitbutton,setsubmitbutton] = useState(false);
    useEffect(() => {
        async function fetchusers(){
            const users = await axios.get(`${BACKEND_URL}/users`);
            if(users.status == 200){
                console.log("USERS", users);
                setusers(users.data.users);
            }
        }
        fetchusers();
    },[]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'OPEN',
        uid: '',
        due_date: "",
        priority: '',
      });

    const handleSave = async() => {
      if(formData.title=="" || formData.description=="" || formData.priority=="" || formData.due_date=="" || formData.uid==""){
        alert("Please fill in all the fields before submitting!");
      }
      else{
        try {
            const res = await axios.post(`${BACKEND_URL}/create-task`,{formData}, {withCredentials:true});
            if(res.status == 200){
                onClose();
                window.location.reload();
            }
        } catch (error) {
            res.status(500).json({error});
        }
      }
    }
    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
      };

    const statusOptions = ['OPEN', 'INPROGRESS'];
    const priorityOptions = ['LOW', 'MEDIUM', 'HIGH'];

    return (
        <Modal show={isOpen} onHide={onClose}>
            <Modal.Header >
                <Modal.Title>Create a New Task</Modal.Title>
                <Button variant="secondary" onClick={onClose} style={{ marginLeft: 'auto' }}> Close</Button>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter title"
                    />
                </Form.Group>

                <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter description"
        />
      </Form.Group>

      <Form.Group controlId="status">
        <Form.Label>Status</Form.Label>
        <Form.Control
          as="select"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="uid">
        <Form.Label>Assign to : </Form.Label>
        <Form.Control
          as="select"
          name="uid"
          value={formData.uid}
          onChange={handleChange}
        >
          <option value="">Select Assignee</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>{user.username}</option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="due_date">
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          type="date"
          name="due_date"
          value={formData.due_date}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="priority">
        <Form.Label>Priority</Form.Label>
        <Form.Control
          as="select"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="">Select Priority</option>
          {priorityOptions.map((priority) => (
            <option key={priority} value={priority}>{priority}</option>
          ))}
        </Form.Control>
      </Form.Group>
      </Form>
            </Modal.Body>
      <Button variant="primary" onClick={handleSave}>Save Changes</Button>
    </Modal>
    )
} 