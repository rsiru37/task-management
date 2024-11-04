import React, { useEffect, useState } from 'react';
import axios from "axios"
import { Modal, Button, Form } from 'react-bootstrap';
import { BACKEND_URL } from '../config';

export const EditTask = ({isOpen, onClose,task}) => {
    // const [startDate,setStartDate]=useState(new Date(2024,10,5));
    const [submitbutton,setsubmitbutton] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'OPEN',
        uid: '',
        due_date: "",
        priority: '',
      });
      const [users,setusers] = useState([]);
      const statusOptions = ['OPEN', 'INPROGRESS'];
      const priorityOptions = ['LOW', 'MEDIUM', 'HIGH'];
    useEffect(() => {
        console.log("TASK", task);
        async function fetch_general_users() {
            try {
                const users = await axios.get(`${BACKEND_URL}/users`);
                setusers(users.data.users); // Fetching General Users from the Backend
            } catch (error) {
                console.error("E", error);
                return;
            }
        }
        fetch_general_users();
    },[]);
    useEffect(() => {
        if (task) {
            setFormData({
            title: task.title || '',
            description: task.description || '',
            status: task.status || '',
            priority: task.priority || '',
            uid:task.uid || '',
            due_date:task.due_date
          });
        }
      }, [task]);

      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
        if(formData.title!="" && formData.description!="" && formData.due_date!=""){
          setsubmitbutton(true);
        }
        else{
          setsubmitbutton(false);
        }
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
      };

    const handleSave = async() => {
      console.log("FORM DATA", formData);
      if(formData.title=="" || formData.description=="" || formData.priority=="" || formData.due_date=="" || formData.uid==""){
        alert("Please fill in all the fields before submitting!");
      }
      else{
      try {
        const res = await axios.put(`${BACKEND_URL}/update-task/?task_id=${task.id}`,{formData}, {withCredentials:true});
        if(res.status == 200){
            onClose();
            window.location.reload();
        }
    } catch (error) {
        res.status(500).json({error});
    }
        console.log("Form Data", formData);
    }
  }
    return(
        <Modal show={isOpen} onHide={onClose}>
            <Modal.Header >
                <Modal.Title>Edit Task</Modal.Title>
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
              {/* <DatePicker placeholderText="dd/mm/yyyy" selected={startDate} onChange={(date) => setStartDate(date)} /> */}

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
      <Button variant="primary" onClick={handleSave} disabled={!submitbutton}>Save Changes</Button>
    </Modal>

    )
}