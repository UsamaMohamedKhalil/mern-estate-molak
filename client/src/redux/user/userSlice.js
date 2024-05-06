import { createSlice } from "@reduxjs/toolkit";

// Initial state for the user slice
const initialState = {
   currentUser: null,
   error: null,
   loading: false,
}

// Create a user slice with reducers for various user actions
const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      // Reducer for starting the sign-in process
      signInStart: (state) => {
         state.loading = true;
      },
      // Reducer for successful sign-in
      signInSuccess: (state , action) => {
         state.currentUser = action.payload;
         state.loading=false;
         state.error = null;
      },
      // Reducer for sign-in failure
      signInFailure: (state,action) => {
         state.error = action.payload;
         state.loading = false;
      },
      // Reducer for starting the user update process
      updateUserStart: (state) => {
         state.loading = true;
      },
      // Reducer for successful user update
      updateUserSuccess: (state,action) => {
         state.currentUser = action.payload;
         state.loading = false;
         state.error = null;
      },
      // Reducer for user update failure
      updateUserFailure: (state,action) =>{
         state.error = action.payload;
         state.loading = false;
      },
      // Reducer for starting the user deletion process
      deleteUserStart: (state) => {
         state.loading = true;
      },
      // Reducer for successful user deletion
      deleteUserSuccess: (state,action) => {
         state.currentUser = null;
         state.loading = false;
         state.error = null;
      },
      // Reducer for user deletion failure
      deleteUserFailure: (state,action) =>{
         state.error = action.payload;
         state.loading = false;
      },
      // Reducer for starting the sign-out process
      signOutUserStart: (state) => {
         state.loading = true;
      },
      // Reducer for successful sign-out
      signOutUserSuccess: (state,action) => {
         state.currentUser = null;
         state.loading = false;
         state.error = null;
      },
      // Reducer for sign-out failure
      signOutUserFailure: (state,action) =>{
         state.error = action.payload;
         state.loading = false;
      },
   }
});

// Export action creators
export const {
   signInStart,
   signInSuccess,
   signInFailure,
   updateUserStart,
   updateUserSuccess,
   updateUserFailure,
   deleteUserStart,
   deleteUserSuccess,
   deleteUserFailure,
   signOutUserStart,
   signOutUserSuccess,
   signOutUserFailure
} = userSlice.actions;

// Export the reducer function
export default userSlice.reducer;
