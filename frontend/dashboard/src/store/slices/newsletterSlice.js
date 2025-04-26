import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";



const newsletterSlice = createSlice({
  name: "newsletter",
  initialState: {
    newsletters: [],
    subscribers: [],
    loading: false,
    successMessage: null,
    error: null,
  },
  reducers: {
    sendNewsletterRequest(state) {
      state.loading = true;
      state.successMessage = null;
      state.error = null;
    },
    sendNewsletterSuccess(state, action) {
      state.loading = false;
      state.successMessage = action.payload;
      state.error = null;
      toast.success("Newsletter sent successfully!");
    },
    sendNewsletterFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.successMessage = null;
      toast.error(`Failed to send newsletter: ${action.payload}`);
    },
    fetchSubscribersRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSubscribersSuccess(state, action) {
      state.loading = false;
      state.subscribers = action.payload;
    },
    fetchSubscribersFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    unsubscribeSubscriberRequest(state) {
      state.loading = true;
      state.error = null;
    },
    unsubscribeSubscriberSuccess(state, action) {
      state.loading = false;
      state.subscribers = state.subscribers.filter(
        (subscriber) => subscriber._id !== action.payload._id
      );
      toast.success("Subscriber unsubscribed successfully!");
    },
    unsubscribeSubscriberFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchNewslettersRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    // Successfully fetched newsletters
    fetchNewslettersSuccess: (state, action) => {
      state.loading = false;
      state.newsletters = action.payload;
    },
    // Failed to fetch newsletters
    fetchNewslettersFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearNewsletterErrors(state) {
      state.error = null;
    },
    
  },
});

export const sendNewsletter = (emailContent) => async (dispatch) => {
  dispatch(newsletterSlice.actions.sendNewsletterRequest());
  try {
    const response = await axios.post(
      "https://mern-stack-portfolio-backend-code-7m37.onrender.com/api/v1/newsletter/send", // Direct URL
      emailContent,
      { withCredentials: true }
    );
    dispatch(newsletterSlice.actions.sendNewsletterSuccess(response.data.message));
  } catch (error) {
    dispatch(newsletterSlice.actions.sendNewsletterFailed(error.response?.data?.message || "An error occurred"));
  }
};

// Fetch all subscribers
export const fetchSubscribers = () => async (dispatch) => {
  dispatch(newsletterSlice.actions.fetchSubscribersRequest());
  try {
    const response = await axios.get(
      "https://mern-stack-portfolio-backend-code-7m37.onrender.com/api/v1/newsletter/subscribers",
      { withCredentials: true }
    );
    dispatch(newsletterSlice.actions.fetchSubscribersSuccess(response.data.subscribers));
  } catch (error) {
    dispatch(
      newsletterSlice.actions.fetchSubscribersFailed(
        error.response?.data?.message || "Failed to fetch subscribers"
      )
    );
  }
};

// Unsubscribe a specific subscriber
export const unsubscribeSubscriber = (subscriberId) => async (dispatch) => {
  dispatch(newsletterSlice.actions.unsubscribeSubscriberRequest());
  try {
    const response = await axios.delete(
      `https://mern-stack-portfolio-backend-code-7m37.onrender.com/api/v1/newsletter/unsubscribe/${subscriberId}`, // Direct URL
      { withCredentials: true }
    );
    dispatch(newsletterSlice.actions.unsubscribeSubscriberSuccess(response.data));
  } catch (error) {
    dispatch(newsletterSlice.actions.unsubscribeSubscriberFailed(error.response?.data?.message || "Failed to unsubscribe"));
  }
};
export const fetchNewsletters = () => async (dispatch) => {
  dispatch(newsletterSlice.actions.fetchNewslettersRequest());
  try {
    const response = await axios.get("https://mern-stack-portfolio-backend-code-7m37.onrender.com/api/v1/newsletter/newsletters", {
      withCredentials: true
    });
    dispatch(newsletterSlice.actions.fetchNewslettersSuccess(response.data.newsletters)); 
  } catch (error) {
    dispatch(newsletterSlice.actions.fetchNewslettersFailed(error.response?.data?.message || "Failed to fetch newsletters"));
  }
};


export const clearNewsletterErrors = () => (dispatch) => {
  dispatch(newsletterSlice.actions.clearNewsletterErrors());
};

export default newsletterSlice.reducer;
