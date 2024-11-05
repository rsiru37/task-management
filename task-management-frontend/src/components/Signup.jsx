import { useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from 'react-router-dom'

export const Signup = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState('REGULAR')
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const value = event.target.value;
        setRole(value);
        onSelect(value);
      };

    return <div>
        <h1> Welcome to Task Management App</h1>
        <h2> SignUp Page</h2>
        <input onChange={(e) => {
            setUsername(e.target.value);
        }} type="text" placeholder="username" /><br></br><br></br>
        <input onChange={(e) => {
            setPassword(e.target.value);
        }} type="password" placeholder="password" /><br></br>

        <label>ROLE</label>
      <select value={role} onChange={handleChange}>
          <option value={"ADMIN"}>ADMIN</option>
          <option value={"REGULAR"}>REGULAR</option>
      </select>

        <button onClick={async () => {
            try {
                const res = await axios.post(`${BACKEND_URL}/signup`, {
                    username,
                    password,
                    role
                });
                console.log("R", res);
                if(res.status == 200){
                    alert("Signup successfull!");
                    setTimeout(() => {
                    navigate('/signin')
                    }, 1000)
                }
            } catch (error) {
                console.log("RES", error.response.data.message);
                alert(`${error.response.data.message}`);
            }
        }}>Submit</button>
        <p className="text-sm text-muted-foreground">
           Already have an account? <a href="/signin" className="underline">Sign In</a>
         </p>
         <br></br>
         <p style={{color:"blue"}}>Since the Backend is deployed on the Cloud, You might have to wait for around 60 seconds for the Backend Server to Start</p>

    </div>
}
// /////////////////////////////////////
// 'use client'

// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { Button } from "./ui/Button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/Card"
// import { Input } from "./ui/Input"
// import { Label } from "./ui/Label"
// import { Select, SelectItem } from "./ui/Select"
// import { Link } from 'react-router-dom'

// export const Signup = () => {
//   const router = useRouter()
//   const [username, setUsername] = useState('')
//   const [password, setPassword] = useState('')
//   const [role, setRole] = useState('REGULAR')
//   const [error, setError] = useState<string | null>(null)

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setError(null)

//     async function signup( username,password,role) {
//         const response = await axios.post(`${process.env.BACKEND_URL}/signup`);
//         console.log("RD", response.data);
//         return { success: true, message: 'Signup successful!' }
//       }

//     const result = await signup(username, password, role)
//     if (result.success) {
//         setTimeout(() => {
//             navigate('/signin')
//           }, 1000)
//     }
//      else {
//       setError(result.message || 'An error occurred during signup.')
//     }
//   }

//   return (
//     <>
//     <Card className="w-[350px]">
//       <CardHeader>
//         <CardTitle>Sign Up</CardTitle>
//         <CardDescription>Create a new account.</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-8">
//           <div className="space-y-2">
//             <Label htmlFor="username">Username</Label>
//             <Input
//               id="username"
//               placeholder="johndoe"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="password">Password</Label>
//             <Input
//               id="password"
//               type="password"
//               placeholder="********"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="role">Role</Label>
//             <Select value={role} onValueChange={setRole}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select a role" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="ADMIN">Admin</SelectItem>
//                 <SelectItem value="REGULAR">Regular</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <Button type="submit">Sign Up</Button>
//         </form>
//         {error && <p className="text-red-500 mt-4">{error}</p>}
//       </CardContent>
//       <CardFooter>
//         <p className="text-sm text-muted-foreground">
//           Already have an account? <Link href="/signin" className="underline">Sign In</Link>
//         </p>
//       </CardFooter>
//     </Card>
//     </>
//   )
// }