import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
    isAuthChecked: false,
    userRequest: false,
    userData: {
        email: "",
        name: "",
    },
    logoutRequest: false,
    updateRequest: false,
    forgotSuccess: false,
    forgotRequest: false,
    resetSuccess: false,
    resetRequest: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        userRequest: (state, action) => {
            state.userRequest = action.payload;
        },
        setAuthChecked: (state, action) => {
            state.isAuthChecked = action.payload;
        },
        setLogout: (state) => {
            state.userData.name = '';
            state.userData.email = '';
        },
        logoutRequest: (state, action) => {
            state.logoutRequest = action.payload;
        },
        setUpdate: (state, action) => {
            state.userData.email = action.payload.user.email;
            state.userData.name = action.payload.user.name;
          },
        setUpdateRequest: (state, action) => {
            state.updateRequest = action.payload;
        },
        forgotSuccess: (state, action) => {
            state.forgotSuccess = action.payload;
          },
        forgotRequest: (state, action) => {
            state.forgotRequest = action.payload;
        },
        resetSuccess: (state, action) => {
            state.resetSuccess = action.payload;
          },
        resetRequest: (state, action) => {
            state.resetRequest = action.payload;
        },
    }
});

export const { setUser, 
    userRequest, 
    setAuthChecked, 
    setLogout, 
    logoutRequest, 
    setUpdate, 
    setUpdateRequest, 
    forgotSuccess, 
    forgotRequest, 
    resetSuccess,
    resetRequest}  = userSlice.actions;
export default userSlice.reducer;
