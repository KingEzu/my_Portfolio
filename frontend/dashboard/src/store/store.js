import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import forgetResetPassSliceReducer from "./slices/forgetResetPassSlice"
import messagesSliceReducer from "./slices/messagesSlice";
import timelineSliceReducer from "./slices/timelineSlice";
import skillSliceReducer from "./slices/skillSlice";
import softwareApplicationSliceReducer from "./slices/softwareApplication.Slice";
import projectSliceReducer from "./slices/projectSlice";
import newsletterReducer from "./slices/newsletterSlice";

export const store = configureStore({
   reducer:{
        user: userReducer,
        forgetPassword: forgetResetPassSliceReducer,
        messages: messagesSliceReducer,
        timeline:timelineSliceReducer,
        skill: skillSliceReducer,
        softwareApplications: softwareApplicationSliceReducer,
        project: projectSliceReducer, 
        newsletter: newsletterReducer
       
        
    }
});