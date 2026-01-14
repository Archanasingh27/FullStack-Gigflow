import { createContext, useContext, useState,useEffect } from "react";
import api from "../api";
import socket from "../socket";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
  if (user?._id) {
    socket.emit("join", user._id);
  }
}, [user]);


  const login = async (data) => {
    const res = await api.post("/auth/login", data);
    setUser(res.data);
    socket.emit("join", res.data._id);
  };

  const register = async (data) => {
    const res = await api.post("/auth/register", data);
    setUser(res.data);
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.error("Logout error", err);
    } finally {
      setUser(null);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
