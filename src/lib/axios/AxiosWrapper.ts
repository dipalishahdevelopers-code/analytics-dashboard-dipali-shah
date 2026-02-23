import axios, { AxiosError, AxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: "/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  async (err: AxiosError) => {
    // Global error handling can be expanded here
    // e.g., redirect to login on 401
    return Promise.reject(err);
  },
);

export default api;
