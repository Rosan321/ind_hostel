import axios from 'axios';
import { logout } from './store/reducers/authSlice';

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

// ✅ Safe logout function (only runs in browser)
const logoutUser = (storeInstance) => {
  if (typeof window !== 'undefined' && storeInstance) {
    try {
      window.sessionStorage.clear();
    } catch (e) {
      // console.error('Failed to clear sessionStorage:', e);
    }
    storeInstance.dispatch(logout());
    window.location.href = '/pages/login';
  }
};

export const configureAxiosInterceptors = (storeInstance) => {
  // ⛔ Prevent interceptor registration on server
  if (typeof window === 'undefined') return;

  // ✅ Request Interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      try {
        if (typeof window !== 'undefined') {
          const token = window.sessionStorage.getItem('token');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
      } catch (e) {
        // console.error('Failed to read token from sessionStorage:', e);
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // ✅ Response Interceptor
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401) {
        const errorMessage = error.response?.data?.message;
        const isAccessTokenExpired =
          errorMessage?.includes('Token Expired, Please login');

        if (!isAccessTokenExpired) {
          return Promise.reject(error);
        }

        // Handle multiple parallel 401 requests
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers['Authorization'] = `Bearer ${token}`;
              return axiosInstance(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        isRefreshing = true;
        originalRequest._retry = true;

        try {
          let refreshToken = null;
          if (typeof window !== 'undefined') {
            refreshToken = window.sessionStorage.getItem('refreshToken');
          }

          // If no refresh token, log out immediately
          if (!refreshToken) {
            logoutUser(storeInstance);
            return Promise.reject(new Error('No refresh token available.'));
          }

          // Try refreshing token
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}auth/user/refresh-token`,
            { refreshToken }
          );

          const { AccessToken: accessToken } = res.data.data;

          if (!accessToken) {
            throw new Error('Refresh token succeeded but no access token returned.');
          }

          // ✅ Save new tokens safely
          if (typeof window !== 'undefined') {
            window.sessionStorage.setItem('token', accessToken);
          }

          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

          processQueue(null, accessToken);
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // ✅ Check if refresh token has expired
          const refreshErrorMessage = refreshError.response?.data?.message;
          const isRefreshTokenExpired = 
            refreshErrorMessage?.includes('Invalid refresh token');

          if (isRefreshTokenExpired) {
            // console.log('Refresh token expired, logging out...');
            logoutUser(storeInstance);
            return Promise.reject(new Error('Refresh token expired. Please login again.'));
          }

          // For other errors during refresh, you might want to handle differently
          // console.error('Token refresh failed:', refreshError);
          logoutUser(storeInstance);
          processQueue(refreshError, null);
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
};

export default axiosInstance;