import axios from "axios";

// Create an Axios instance with default settings
const apiClient = axios.create({
  baseURL: "/api", // Relative path; Vite's proxy will forward this to the backend
  timeout: 5000, // Request timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor for adding authentication tokens (if needed)
apiClient.interceptors.request.use(
  (config) => {
    // Example: Add an Authorization header if a token exists
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Centralized API functions
export const fetchHelloMessage = async () => {
  const response = await apiClient.get("/hello");
  return response.data;
};

export const fetchUsers = async () => {
  const response = await apiClient.get("/users");
  return response.data;
};

export const createUser = async (userData: Record<string, any>) => {
  const response = await apiClient.post("/users", userData);
  return response.data;
};

export const updateUser = async (
  userId: string,
  userData: Record<string, any>
) => {
  const response = await apiClient.put(`/users/${userId}`, userData);
  return response.data;
};

export const deleteUser = async (userId: string) => {
  const response = await apiClient.delete(`/users/${userId}`);
  return response.data;
};

export default apiClient;
