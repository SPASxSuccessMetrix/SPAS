import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: "",
        isLoggedIn: false
    },
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload
        },
        login: (state) => {
            state.isLoggedIn = true
        },
        logout: (state) => {
            state.isLoggedIn = false;
        }
    }
})

export const {setUsername, login, logout} = userSlice.actions;
export default userSlice.reducer