import { useEffect, useState } from "react"
import axios from "axios";
import TaskCard from "./ui/TaskCard";
import { useNavigate } from 'react-router-dom'
import { BACKEND_URL } from "../config";

export const Dashboard = () => {
const [username, setusername] = useState("");
const [tasks, settasks]=useState([]);
const [socket,setsocket]=useState();
const navigate = useNavigate();

    useEffect(() => {
        async function mounting() {
            const socket = new WebSocket("ws://localhost:3000");
            socket.onopen = () =>{
            console.log("Connected from the Frontend Side");
            setsocket(socket);
            }
            const user = await axios.get(`${BACKEND_URL}/user`, { withCredentials:true });
            setusername(user.data.user.username);
            const data = await axios.get(`${BACKEND_URL}/fetch-regular-tasks`, {
                withCredentials:true
            });
            console.log("DTA", data.data.tasks);
            // setusername(data.data.user.username);
            settasks(data.data.tasks);
            // console.log("DATA", data.data);
        }
        mounting()
    }, []);

    return (
        <div>
            <h1 style={{marginTop:'20px', textAlign:'center'}}> Task Management App</h1>
            <button 
            style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                padding: '10px 20px',
                fontSize: '16px',
                cursor: 'pointer',}} onClick={async()  => {await axios.post(`${BACKEND_URL}/logout`, {}, {withCredentials:true}); navigate("/signin")}}>Logout</button>
            <h1>Welcome {username}</h1>
            <br></br>

            <h2>My Tasks </h2>
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '16px',
                    padding: '20px',
                }}
                >
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>
        </div>
    )
}