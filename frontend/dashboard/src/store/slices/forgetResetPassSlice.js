import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const forgetResetPassSlice = createSlice({
  name: "forgetPassword",
  initialState: {
    loading: false,
    error: null,
    message: null,
    
  },
  reducers: {
    forgetPasswordRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    forgetPasswordSuccess(state, action) {
        state.loading = false;
        state.error = null;
        state.message = action.payload;
    },
    forgetPasswordFailed(state, action) {
        state.loading = false;
        state.error = action.payload;
        state.message = null;
    },
    resetPasswordRequest(state, action) {
        state.loading = true;
        state.error = null;
        state.message = null;
      },
      resetPasswordSuccess(state, action) {
          state.loading = false;
          state.error = null;
          state.message = action.payload;
      },
      resetPasswordFailed(state, action) {
          state.loading = false;
          state.error = action.payload;
          state.message = null;
      },
  
    clearAllErrors(state, action) {
        state.error = null;
        state = state;
      },
    },
  });
  export const forgetPassword = (email) => async (dispatch) => {
    dispatch(forgetResetPassSlice.actions.forgetPasswordRequest());
   
    try{
        const response = await axios.post(
            "https://mern-stack-portfolio-backend-code-7m37.onrender.com/api/v1/user/password/forget",
            {email },
            {
                withCredentials:true,
                headers: { "Content-Type": "application/json"}
            }
        );
        
        dispatch(forgetResetPassSlice.actions.forgetPasswordSuccess(response.data.message));
    
    }catch (error) {
        dispatch(forgetResetPassSlice.actions.forgetPasswordFailed(
            error.response.data.message
        ));

    }
  };
  
  export const resetPassword = (token, password, confirmPassword) => async (dispatch) => {
    dispatch(forgetResetPassSlice.actions.resetPasswordRequest());

    try{
        const response = await axios.put(
            `https://mern-stack-portfolio-backend-code-7m37.onrender.com/api/v1/user/password/reset/${token}`,
            {password, confirmPassword },
            {
                withCredentials:true,
                headers: { "Content-Type": "application/json"}
            }
        );
        dispatch(forgetResetPassSlice.actions.resetPasswordSuccess(response.data.message));
        dispatch(forgetResetPassSlice.actions.clearAllErrors());
      } catch (error) {
        dispatch(forgetResetPassSlice.actions.resetPasswordFailed(error.response.data.message));


    }
  };
  

  export const clearAllForgetPasswordErrors = () => {
    dispatch(forgetResetPassSlice.actions.clearAllErrors());
};


  
  
  export default forgetResetPassSlice.reducer;