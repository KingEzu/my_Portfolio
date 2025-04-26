import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: {},
    isAuthenticated: false,
    error: null,
    message: null,
    isUpdated: false,
  },
  reducers: {
    loginRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },
    logoutSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = action.payload;
    },
    logoutFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = state.isAuthenticated;
      state.user = state.user;
      state.error = action.payload;
    },
    loadUserRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    loadUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loadUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },
    updatePasswordRequest(state,action){
      state.loading = true;
      state.isAuthenticated = false;
      state.message= null;
      state.error= null;
    },
    updatePasswordSuccess(state,action){
      state.loading = false;
      state.isAuthenticated = true;
      state.message= action.payload;
      state.error= null;
    },
    updatePasswordFailled(state,action){
      state.loading = false;
      state.isAuthenticated = false;
      state.message= null;
      state.error= action.payload;
    }, 
    updateProfileRequest(state,action){
      state.loading = true;
      state.isAuthenticated = false;
      state.message= null;
      state.error= null;
    },
    updateProfileSuccess(state,action){
      state.loading = false;
      state.isAuthenticated = true;
      state.message= action.payload;
      state.error= null;
    },
    updateProfileFailled(state,action){
      state.loading = false;
      state.isAuthenticated = false;
      state.message= null;
      state.error= action.payload;
    },
    updateProfileResetAfterUpdate(state, action) {
      state.error = null;
      state.isUpdated = false;
      state.message = null;
    }, 
    clearAllErrors(state, action) {
        state.error = null;
        state = state.user;
      },
    },
  });
  export const login = (email, password) => async (dispatch) => {
    dispatch(userSlice.actions.loginRequest());
    try {
      const { data } = await axios.post(
        "https://mern-stack-portfolio-backend-code-7m37.onrender.com/api/v1/user/login",
        { email, password },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );
      dispatch(userSlice.actions.loginSuccess(data.user));
      dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(userSlice.actions.loginFailed(error.response.data.message));
    }
  };
  
  export const getUser = () => async (dispatch) => {
    dispatch(userSlice.actions.loadUserRequest());
    try {
      const { data } = await axios.get("https://mern-stack-portfolio-backend-code-7m37.onrender.com/api/v1/user/me", {
        withCredentials: true,
      });
      dispatch(userSlice.actions.loadUserSuccess(data.user));
      dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
      // Ensure error.response exists and fallback to error.message if undefined
      const errorMessage = error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
  
      dispatch(userSlice.actions.loadUserFailed(errorMessage));
    }
  };
  
  export const logout = () => async (dispatch) => {
    try {
      const { data } = await axios.get(
        "https://mern-stack-portfolio-backend-code-7m37.onrender.com/api/v1/user/logout",
        { withCredentials: true }
      );
      dispatch(userSlice.actions.logoutSuccess(data.message));
      dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(userSlice.actions.logoutFailed(error.response.data.message));
    }
  };



  export const updatePassword = (currentPassword, newPassword, confirmPassword) => async(dispatch)=>{
    dispatch(userSlice.actions.updatePasswordRequest());
    try{
      const { data } = await axios.put(
        "https://mern-stack-portfolio-backend-code-7m37.onrender.com/api/v1/user/update/password",
        { currentPassword, newPassword, confirmPassword },
        {
          withCredentials: true,
          headers: { "content-Type": "application/json"},
        }
      );
      dispatch (userSlice.actions.updatePasswordSuccess(data.message));
      dispatch(userSlice.actions.clearAllErrors());
    }catch(error) {
      dispatch(userSlice.actions.updatePasswordFailled(error.response.data.message))

    }

    

  };

export const updateProfile = (newData) => async(dispatch)=>{
    dispatch(userSlice.actions.updateProfileRequest());
    try{
      const { data } = await axios.put(
        "https://mern-stack-portfolio-backend-code-7m37.onrender.com/api/v1/user/update/me",
         newData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data"},
        }
      );
      dispatch (userSlice.actions.updateProfileSuccess(data.message));
      dispatch(userSlice.actions.clearAllErrors());
    }catch(error) {
      dispatch(userSlice.actions.updateProfileFailled(error.response.data.message))

    }
    

  };

  export const resetprofile = () => (dispatch) =>{
    dispatch(userSlice.actions.updateProfileResetAfterUpdate());
    
  };






  export const clearAllUserErrors = () => (dispatch) => {
    dispatch(userSlice.actions.clearAllErrors());
  };
  
  export default userSlice.reducer;




