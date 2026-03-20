import { useNavigate } from "react-router";
import api from "./api";

/**
 * Login user
 * Calls /auth/login and stores JWT + user info
 */
export const login = async (username, password) => {
  const res = await api.post("/auth/login", {
    username,
    password
  });

  const { token } = res.data;

  if (token) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(decodeToken(token)));
  }

  return res.data;
};
/**
 * Sign up user
 * Calls /auth/signup and stores JWT + user info
 */
export const signup = async (username, email, password) => {
  const res = await api.post("/auth/signup", {
    username,
    email,
    password
  });


  return res.data;
};

/**
 * Decode JWT payload
 */
const decodeToken = (token) => {
  try {
    const payload = token.split(".")[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded);
  } catch (e) {
    return null;
  }
};

/**
 * Check authentication validity
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  const payload = decodeToken(token);
  if (!payload) return false;

  const now = Math.floor(Date.now() / 1000);

  console.log("inside is authentificated ");
  console.log("is auth : ", payload.exp > now);
  
  
  return payload.exp > now;
};

/**
 * Get current user info from token
 */
export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"))
};

/**
 * Get raw JWT token
 */
export const getToken = () => {
  return localStorage.getItem("token");
};

/**
 * Logout user
 */
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};


export const handleLogout = (navigate) => {
  console.warn("***** You are loging out *******")
  localStorage.clear()
  navigate('/login')
}