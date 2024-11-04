import {React, useState} from 'react';
import axios from "axios"
import { EditTask } from '../EditTask';
import { FaTrash } from 'react-icons/fa';

function AdminCard({ task }) {
  const due = new Date(task.due_date);
  const [showModel, setShowModel] = useState(false);
  const onDelete = async() => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        const res = await axios.delete(`${BACKEND_URL}/delete-task/?task_id=${task.id}`,{withCredentials:true});
        if(res.status == 200){
          alert("Task Deleted!");
          window.location.reload();
        }
      } catch (error) {
        console.error("E", error);
      }
      
    }
  }
  return (
    <div
      style={{
        position:  "relative",
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        maxWidth: '300px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        margin: '10px',
      }}
    >
      <h3 style={{ margin: '0 0 10px 0' }}>{task.title}</h3>
      <p style={{ fontSize: '14px', color: '#555' }}>{task.description}</p>
      
      <div style={{ marginTop: '10px', fontSize: '14px' }}>
        <strong>Due Date:</strong> {due.toLocaleDateString('en-GB')}
      </div>
      
      <div style={{ marginTop: '5px', fontSize: '14px' }}>
        <strong>Priority:</strong> {task.priority}
      </div>
      
      <div style={{ marginTop: '5px', fontSize: '14px' }}>
        <strong>Assigned To:</strong> {task.User.username}
      </div>
      
      <div style={{ marginTop: '5px', fontSize: '14px' }}>
        <strong>Status:</strong> {task.status}
      </div>
      <button type="button" class="btn btn-primary" onClick={() => {setShowModel(true)}}>Edit Task</button>
      <EditTask onClose={() => {setShowModel(false)}} isOpen={showModel} key={task.id} task={task}/>
      <div
          style={{
            position: 'absolute',
            bottom: '22px',
            right: '10px',
            cursor: 'pointer',
            color: 'red'
          }} onClick={onDelete}> <FaTrash size={15} /></div>
    </div>
  );
}

export default AdminCard;