import './App.css'

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from './components/Signup';
import { Signin } from './components/Signin';
import { Dashboard } from './components/Dashboard';
import { ADashboard } from './components/ADashboard';
import Home from './components/Home';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/signin"} element={<Signin />} />
        <Route path={"/dashboard"} element={<Dashboard />} />
        <Route path={"/admin-board"} element={<ADashboard />} />
        <Route path={"/"} element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App