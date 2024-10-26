import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import SharedTask from "./components/SharedTask/SharedTask";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/sharedtask/:id" element={<SharedTask />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
