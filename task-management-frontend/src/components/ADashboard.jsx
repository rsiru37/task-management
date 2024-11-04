import { useEffect, useState } from "react"
import axios from "axios";
import AdminCard from "./ui/AdminCard";
import TaskCard from "./ui/TaskCard";
import { useNavigate } from 'react-router-dom'
import { CreateTask } from "./CreateTask";
import { Table} from 'react-bootstrap';
import { BACKEND_URL } from "../config";

export const ADashboard = () => {
    const [username, setusername] = useState("");
    const [users, setusers] = useState([]);
    const [tasks, settasks]=useState([]);
    const [other_tasks,setother_tasks] = useState([]);
    const navigate = useNavigate();
    const [showModel, setShowModel] = useState(false);
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
    useEffect(() => {
        async function mounting() {
            const user = await axios.get(`${BACKEND_URL}/admin`, { withCredentials:true });
            setusername(user.data.user.username);
            const data = await axios.get(`${BACKEND_URL}/fetch-admin-tasks`, {
                withCredentials:true
            });
            console.log("DTA", data.data.tasks);
            settasks(data.data.tasks);
            const data2 = await axios.get(`${BACKEND_URL}/fetch-other-tasks`,{withCredentials:true});
            setother_tasks(data2.data.tasks);
        }
        mounting()
    }, []);


    return(
        <div>
            <h1 style={{marginTop:'20px', textAlign:'center'}}> Task Management App</h1>
            <button 
            style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                padding: '10px 20px',
                fontSize: '16px',
                cursor: 'pointer',}} onClick={async()  => {await axios.post(`${BACKEND_URL}/logout`, {}, {withCredentials:true}); navigate("/signin")}}>Logout
            </button>
            <h1>Welcome {username}</h1>
            <br></br>
            <CreateTask onClose={() => {setShowModel(false)}} isOpen={showModel}/>
            <button type="button" class="btn btn-success" onClick={() => {setShowModel(true)}}>Create Task</button>
            <br></br>
            <h2>My Tasks </h2>
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '16px',
                    padding: '20px',
                }}>
                {tasks.map((task) => (
                    <AdminCard key={task.id} task={task} />
                ))}
            </div>

            <br></br>
                {other_tasks.length == 0 ? <h5>No Other Tasks!</h5> :
                (<div className="container mt-4">
                    <h2>Other Tasks</h2>
                    <Table striped bordered hover responsive>
                      <thead>
                        <tr>
                          <th>Task ID</th>
                          <th>Title Name</th>
                          <th>Description</th>
                          <th>Status</th>
                          <th>Assigned to</th>
                          <th>Created by</th>
                          <th>Due Date</th>
                          <th>Priority</th>
                        </tr>
                      </thead>
                      <tbody>
                        {other_tasks.map(task => (
                            <tr key={task.id}>
                                <td>{task.id}</td>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>{task.status}</td>
                                <td>{task.User.username}</td>
                                <td>{task.User_Tasks_aidToUser.username}</td>
                                <td>{new Date(task.due_date).toLocaleDateString('en-GB')}</td>
                                <td>{task.priority}</td>
                            </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>)}
        </div>
    )
}