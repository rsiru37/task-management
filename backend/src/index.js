import express from "express"
import cors from "cors"
import bcrypt from "bcrypt"
import { PrismaClient, role, priority, status } from '@prisma/client'
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser";

const prisma = new PrismaClient()
const app = express();
app.use(cookieParser());
app.use(cors({
    origin: "https://task-management-frontend-lime-seven.vercel.app",
    origin: ["https://task-management-frontend-lime-seven.vercel.app","http://localhost:5173"],
    credentials:true,
}));
    
    
app.use(express.json());

app.post("/signup", async(req,res) => {
    console.log("BODY", req.body);
    const {username, password, role} = req.body;
    const existing_user = await prisma.user.findFirst({where: {username:username}});
    if(existing_user){
        res.status(302).json({message:"User already exists try with a different username"});
    }
    else{
        const hashedPassword = await bcrypt.hash(password,10);
        try {
            console.log("Entered", username, hashedPassword, role);
            const user = await prisma.user.create({
                data:{
                    username:username,
                    password:hashedPassword,
                    role:role
                }
            });
            res.status(200).json({message:"User Creation is Successfull!"});
        } catch (error) {
            console.log("ERROR", error);
            res.status(500).json({error:error});
        }
    }
})

app.post("/login", async(req,res) => {
    const {username, password} = req.body;
    const existing_user = await prisma.user.findFirst({where: {username:username}});
    if(existing_user){
        const passwordValidation = await bcrypt.compare(password, existing_user.password);
        if(passwordValidation){
            const token = jwt.sign({id:Number(existing_user.id)}, process.env.JWT_SECRET);
            console.log("TOKEN", token);
            res.cookie("token",token,{httpOnly: true,secure: true,sameSite: 'None'});
            if(existing_user.role == "REGULAR"){
                res.status(200).json({message:"Logged in as regular", token:token});
            }
            if(existing_user.role == "ADMIN"){
                res.status(201).json({message:"Logged in as admin", token:token});
            }
        }
        else{
            res.status(400).json({message:"Wrong Password"});
        }    
    }
    else{
        res.status(400).json({message:"Username doesn't exist"})
    }
})

async function adminauth(req, res, next) {
    const token = req.cookies.token;
    if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        const admin = await prisma.user.findFirst(
            {where: 
                {
                    id:Number(req.user.id), role: role.ADMIN
                }
             });
        if(admin){
            next();
        }
        else{
            res.status(402).send({message:"Not an Admin"});
        }
    }
    else {
        res.status(401).send({
            message: "Unauthorized"
        })
    }
}

async function regularauth(req, res, next) {
    console.log("Entered here!")
    const token = req.cookies.token;
    console.log("T", token);
    if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        const regular = await prisma.user.findFirst(
            {where: 
                {
                    id:req.user.id, role: role.REGULAR
                }
             });
        if(regular){
            next();
        }
        else{
            res.status(402).send({message:"Not Regular user"});
        }
    }
    else {
        res.status(401).send({
            message: "Unauthorized"
        })
    }
}




app.post("/create-task", adminauth, async(req,res) => {
    try {
        console.log("REQ", req.body, req.user);
        const { title, description, status, uid, priority,due_date } = req.body.formData;
        console.log("T",title,description);
        const task = await prisma.tasks.create({
            data: {
                title,
                description,
                status,
                uid: Number(uid),
                priority,
                aid:req.user.id,
                due_date: new Date(due_date),
            },
        });

        console.log("TASK", task);
        return res.status(200).json({message:"Task Created!"});

    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).send("Error creating task");
    }
})

app.put("/update-task", adminauth, async(req,res) => {
    const {task_id} = req.query;
    console.log("TASK ID", task_id);
    const {title, description, status, uid, priority, due_date} = req.body.formData;
    console.log("REQ.BODY", req.body);
    const task = await prisma.tasks.findUnique({where:{id:Number(task_id)}}); // Fetching the Task Object
    console.log("TASK", task);
    if(task){
        if(task.aid == req.user.id){ // Proceed to Update
            const update_task = await prisma.tasks.update({
                    where: {id: task.id},
                    data:
                    {
                        title:title,
                        description:description,        
                        status:status,
                        uid:Number(uid),
                        priority:priority,
                        due_date: new Date(due_date)
                    }
                }
            )
            res.status(200).json({message:"Update Successfull!"});
        }
        else{
            res.status(403).json({message:"You don't have access to update this task"});
        }
    }
    else{
        res.status(399).json({message:"Task Doesn't exist"});
    }
})

app.delete("/delete-task", adminauth, async(req,res) => {
    const {task_id} = req.query;
    const task = await prisma.tasks.findUnique({where:{id:Number(task_id)}}); // Fetching the Task Object
    if(task){
        if(task.aid == req.user.id){
            const dtask = await prisma.tasks.delete({
                where:{id:task.id}
            })
            res.status(200).json({message:"Task Deleted Successfully!"});
        }
        else{
            res.status(403).json({message:"You don't have access to delete this task"});
        }
    }
    else{
        res.status(399).json({message:"Task Doesn't exist"});
    }
})

app.get("/tasks", async(req,res) => {
    const tasks = await prisma.tasks.findMany();
    console.log("Tasks", tasks);
    res.status(200).json({tasks});
})

app.get("/fetch-regular-tasks",regularauth, async(req,res) => {
    const tasks = await prisma.tasks.findMany({
        where: { uid:req.user.id }, // Filter tasks by given uid
        include: {
          User_Tasks_aidToUser: {
            select: {username: true},
          },
        },
      });
    res.status(200).json({tasks}); 
});
app.get("/fetch-admin-tasks", adminauth, async(req,res) => {
    const tasks = await prisma.tasks.findMany({
        where: { aid:req.user.id }, // Filter tasks by given aid admin id
        include: {
          User:{select:{username:true}},
          User_Tasks_aidToUser: {
            select: {username: true},
          },
        },
      });
    res.status(200).json({tasks}); 
});

app.get("/fetch-other-tasks", adminauth, async(req,res) => {
    const tasks = await prisma.tasks.findMany({
        where:{aid : {not:req.user.id}},
        include:{
            User:{select:{username:true}},
            User_Tasks_aidToUser:{select:{username:true}}
        }
    })
    res.status(200).json({tasks});
})

app.put("/completed", regularauth, async(req,res) => {
    const {task_id} = req.query;
    const task = await prisma.tasks.findUnique({where:{id:Number(task_id)}}); // Fetching the Task Object
    if(task){
        if(task.uid == req.user.id){ // Users can only update their tasks
            console.log("ENTERED INTO THE COMPLETED BLOK")
            await prisma.tasks.update({
                where: {id: task.id},
                data:{status:status.COMPLETED}
            });
            res.status(200).json({message:"Task Updated to COMPLETED!"});
        }
        else{
            res.status(403).json({message:"You don't have access to update the status of this task"});
        }
    }
    else{
        res.status(399).json({message:"Task Doesn't exist"});
    }
})

app.get('/user',regularauth, async(req,res) => {
    const user = await prisma.user.findUnique({
        where:{id:req.user.id}
    });
    res.status(200).json({user});
})

app.get("/admin", adminauth, async(req,res) => {
    try {
        const user = await prisma.user.findUnique({
            where:{id:req.user.id}
        });
        res.status(200).json({user});
    } catch (error) {
        res.status(400).json({error:error});
        
    }
})

app.get("/users", async(req,res) => {
    try {
        const users = await prisma.user.findMany({
            where:{role:role.REGULAR}
        });
        res.status(200).json({users});
    } catch (error) {
        res.status(500).json({error:error})
        
    }
})



app.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "Logged out!"
    })
});

app.listen(3000, () => {console.log("App has started!")});