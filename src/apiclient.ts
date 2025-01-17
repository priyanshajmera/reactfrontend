import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

console.log("url:", import.meta.env.VITE_API_URL);
// Create an Axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Replace with your backend API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    
      (
        config.headers as Record<string, string>
      ).Authorization = `Bearer ${token}`;
    

    return config;
  },
  (error: AxiosError) => Promise.reject(error) // Handle request errors
);

// Add a response interceptor to handle token expiration
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response, // If the response is successful, just return it
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized access - redirecting to login");
      
      localStorage.removeItem("token");
      window.location.href = "/login"; 
    }
    return Promise.reject(error); 
  }
);

export default apiClient;
