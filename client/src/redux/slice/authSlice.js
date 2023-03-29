import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  status: 'loading',
};
export const registerUser = createAsyncThunk('/api/auth/register', async (params) => {
  try {
    const { data } = await axios.post('/api/auth/register', params);
    if (data.token) {
      window.localStorage.setItem('token', data.token);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
});
export const loginUser = createAsyncThunk('/api/auth/login', async ({ username, password }) => {
  try {
    const { data } = await axios.post('/api/auth/login', {
      username,
      password,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // registerStart: (state) => {
    //   state.isLoading = true;
    // },
    // registerSuccess: (state, action) => {
    //   state.isLoading = false;
    //   state.user = action.payload;
    // },
    // registerFailure: (state) => {
    //   state.isLoading = false;
    //   state.error = true;
    // },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.status = null;
    },
  },
  extraReducers: {
    // Register
    [registerUser.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    [registerUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    },
    // Login
    [loginUser.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      // state.status = action.payload.message;
      state.user = action.payload.user;
      // state.token = action.payload.token;
    },
    [loginUser.rejected]: (state, action) => {
      state.isLoading = false;
      // state.status = action.payload.message;
    },
  },
});

export const checkIsAuth = (state) => Boolean(state.auth.token);
export const { registerStart, registerSuccess, registerFailure, logout } = authSlice.actions;
export default authSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   user: null,
//   loading: false,
//   error: false,
// };

// export const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     loginStart: (state) => {
//       state.loading = true;
//     },
//     loginSuccess: (state, action) => {
//       state.loading = false;
//       state.user = action.payload;
//     },
//     loginFailure: (state) => {
//       state.loading = false;
//       state.error = true;
//     },
//     logout: (state) => {
//       state.user = null;
//       state.loading = false;
//       state.error = false;
//     },
//   },
// });

// export const { loginStart, loginSuccess, loginFailure, logout, subscription } = userSlice.actions;

// export default userSlice.reducer;
