import axios, { AxiosError } from 'axios';

let getToken: (() => Promise<string | null>) | null = null;

export const setTokenGetter = (tokenFunction: () => Promise<string | null>) => {
  getToken = tokenFunction;
};

export const createAxiosInstance = (baseURL: string) => {
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    timeout: 60000,
  });

  instance.interceptors.request.use(
    async (config) => {
      if (getToken) {
        try {
          const token = await getToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (error) {
          console.log(error);
          console.warn('No token found, proceeding without authentication.');
        }
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return instance;
};

export const handleAxiosError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string }>;

    if (axiosError.response) {
      return axiosError.response.data?.message || 'An unknown error occurred';
    }

    return axiosError.message;
  }

  return 'An unknown error occurred';
};
