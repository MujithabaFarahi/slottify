import { createAxiosInstance } from '@/redux/services/axios';
import { createAppStore } from '@/redux/store/store';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

const axiosInstance = createAxiosInstance(API_BASE_URL);

export const appStore = createAppStore(axiosInstance);
