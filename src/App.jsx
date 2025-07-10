import { useState } from "react";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskDetailPage from "./pages/TaskDetailPage/TaskDetailPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/api-todo/:id" element={<TaskDetailPage />} />
    </Routes>
  );
}

export default App;
