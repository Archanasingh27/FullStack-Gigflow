import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.jsx";

import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PostGig from "./pages/PostGig";
import ManageGigPage from "./pages/manageGig.jsx";
import { Toaster } from "react-hot-toast";


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
       <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
        }}
      />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/gigs/:gigId" element={<ManageGigPage />} />

        <Route path="/post" element={<PostGig />} />
      </Routes>
    </BrowserRouter>
  );
}
