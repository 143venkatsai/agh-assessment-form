import axios from "axios";
import { store } from "../main";
import { setToken } from "../slices/authSlice";
import { logoutUser } from "../utils/functions";
import toast from "react-hot-toast";

async function onRejectApiCall(error) {
  const originalRequest = error.config;
  if (error.response) {
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      const userToken = localStorage.getItem("token");
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/v1/auth/refresh-token`,
          { token: userToken, refreshToken: refreshToken },
          {
            withCredentials: true,
          },
        );

        if (response.data.success === false) {
          store.dispatch(setToken(null));
          window.location.href = "/";
          localStorage.clear();
        }
        const newAccessToken = response.data.token;
        if (newAccessToken) {
          localStorage.setItem("token", newAccessToken);
          store.dispatch(setToken(newAccessToken));
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } else {
          throw new Error("Invalid token response");
        }
      } catch (e) {
        logoutUser();
        return Promise.reject(e);
      }
    } else if (error.response.status === 403) {
      // when access is expired
      logoutUser();
      toast.error(error?.response?.data?.message || "Assess is expired");
      return Promise.reject(error);
    }
  }
  return Promise.reject(error);
}

function onFullFillApiCall(response) {
  return response;
}

const axiosInstance = axios.create({});

axiosInstance.interceptors.response.use(onFullFillApiCall, onRejectApiCall);

export const apiConnector = async (method, url, bodyData, headers, params) => {
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData,
    headers: headers,
    params: params,
  });
};

export default axiosInstance;
