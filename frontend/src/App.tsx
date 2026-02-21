import { Route, Routes } from "react-router-dom";
import NavBar from "./navbar/NavBar";
import Index from "./pages/index/Index";
import Login from "./pages/Login/Login.tsx";
import Dashboard from "./pages/MasterCrud/Dashboard.tsx";

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/*" element={<h1>Not Found</h1>} />
        <Route path="/index" element={<Index />} />
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
