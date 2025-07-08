import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { handleAxiosError } from '../services/axios';
import type {
  LoginCredentials,
  LoginResponse,
  User,
} from './interfaces/authInterfaces';
import type { AxiosInstance } from 'axios';

export interface authState {
  user: User | null;
  loading: boolean;
  message: string | null;
  error: boolean;
  success: boolean;
  isRegistered: boolean;
  customToken: string | null;
  email: string | null;
}

const initialState: authState = {
  user: null,
  loading: false,
  message: null,
  error: false,
  success: false,
  isRegistered: false,
  customToken: null,
  email: null,
};

export const login = createAsyncThunk<
  LoginResponse,
  LoginCredentials,
  { extra: { axios: AxiosInstance } }
>('auth/login', async (credentials, { rejectWithValue, extra }) => {
  try {
    const response = await extra.axios.post('/web/auth/login', credentials);
    return response.data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = false;
    },
    resetSuccess: (state) => {
      state.success = false;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.message = '';
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        const { message } = action.payload;
        state.message = message;
        console.log(action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload as string;
      });
  },
});

export const { setIsLoading, clearError, resetSuccess } = authSlice.actions;
export default authSlice.reducer;
