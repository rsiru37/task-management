### Task Management App

## Local Setup - Backend
1. After cloning the repo navigate to /backend folder and run `npm install`
2. Populate .env variables(JWT_SECRET,DIRECT_URL,DATABASE_URL)
3. Edit the index.js, and add the local Frontend url(localhost:5173) to the cors object origin for the Backend to run smoothly.
4. Finally run `npm run start` to start the Backend Server Locally

## Local Setup - Frontend
1. Navigate to /task-management-frontend folder
2. Run `npm install`
3. Navigate to /task-management-frontend/src/config.js and modify the variable to the Local Backend Server URL
4. Run `npm run dev` to start the Frontend Server Locally
