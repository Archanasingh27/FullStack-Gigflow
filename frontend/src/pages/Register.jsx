import { useApp } from "../context/AuthContext.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useApp();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);
      await register(form);
      navigate("/"); 
    } catch (err) {
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };
     

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-6 rounded-lg shadow w-80 space-y-4">
      
      <input
          className="input w-full"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />



        <input
          className="input w-full"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="input w-full"
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          className="btn w-full"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

      </div>
    </div>
  );
}
