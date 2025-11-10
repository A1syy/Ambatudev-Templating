// Simple client-side auth helper for admin frontend
import axios from "axios";

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

export function getTokenExp() {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem("token_exp");
  return v ? Number(v) : null;
}

export function isAuthenticated() {
  const token = getToken();
  const exp = getTokenExp();
  if (!token) return false;
  if (exp && Date.now() > exp) {
    clearAuth();
    return false;
  }
  return true;
}

export function clearAuth() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("token_exp");
  // remove UI flag used by ProtectedRoute
  localStorage.removeItem("isLoggedIn");
}

export function logoutAndRedirect() {
  clearAuth();
  if (typeof window !== "undefined") window.location.href = "/login";
}

export function setAxiosAuthHeader(instance = axios) {
  const token = getToken();
  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common["Authorization"];
  }
}

export default {
  getToken,
  getTokenExp,
  isAuthenticated,
  clearAuth,
  logoutAndRedirect,
  setAxiosAuthHeader,
};
