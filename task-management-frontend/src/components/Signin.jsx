import { useState } from "react"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { BACKEND_URL } from "../config"

export const Signin = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    return <div>
        <h1> Welcome to Task Management App</h1>
        <h2> SignIn Page</h2>
        <input onChange={(e) => {
            setUsername(e.target.value);
        }} type="text" placeholder="username" /><br></br><br></br>
        <input onChange={(e) => {
            setPassword(e.target.value);
        }} type="password" placeholder="password" /><br></br>

        <button onClick={async () => {
            try {
                const res = await axios.post(`${BACKEND_URL}/login`, {
                    username,
                    password,
                },{ withCredentials:true });

                if(res.status == 200){
                    navigate('/dashboard')
                }
                if(res.status == 201){
                    navigate('/admin-board')
                }
                
            } catch (error) {
                console.log("RES", error.response.data.message);
                alert(`${error.response.data.message}`);
            }
        }}>LOG IN</button>
        <br></br>
        <p className="text-sm text-muted-foreground">
           New here? <a href="/signup" className="underline">Sign Up</a></p>
           <br></br>
        <p style={{color:"blue"}}>Since the Backend is deployed on the Cloud, You might have to wait for around 60 seconds for the Backend Server to Start</p>
        <div className="text-bottom" style={{
        position: 'absolute',
        bottom: '220px', // Distance from the bottom
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        color:"red"
      }}>Default Credentials : 
      username:raj1,pwd:raj1 ADMIN<br></br>
      username:raj0,pwd:raj0 REGULAR<br></br>
      </div>
    </div>
}