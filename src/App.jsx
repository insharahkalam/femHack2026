import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CreateResume from "./pages/CreateResume";
import ResumePreview from "./pages/ResumePreview";
import EditResume from "./Components/EditResume";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateResume />} />
        <Route path="/resume-preview" element={<ResumePreview />} />
        <Route path="/edit/:id" element={<EditResume />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
