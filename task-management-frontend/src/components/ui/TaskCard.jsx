import React from 'react';
import axios from "axios"
import { BACKEND_URL } from '../../config';

function TaskCard({ task, onStatusChange }) {
  const due = new Date(task.due_date);
  const handleCheckboxChange = async(task_id) => {
    try {
      const res = await axios.put(`${BACKEND_URL}/completed?task_id=${task_id}`, {},{ withCredentials: true });   
      if(res.status==200){
          window.location.reload();
      }
  } catch (error) {
      console.log("E", error);
  }};
  console.log("TASK37", task);
  return (
    <div
      style={{
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
        <strong>Assigned By:</strong> {task.User_Tasks_aidToUser.username}
      </div>
      
      <div style={{ marginTop: '5px', fontSize: '14px' }}>
        <strong>Status:</strong> {task.status}
      </div>
      {task.status !== 'COMPLETED' && (
        <label style={{ marginTop: '10px', display: 'block' }}>
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange(task.id)}
          />
          Mark as Completed
        </label>
      )}
    </div>
  );
}

export default TaskCard;