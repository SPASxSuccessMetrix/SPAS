import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: "",
        isLoggedIn: false,
        isProfessor: false
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
        },
        setRole: (state, action) => {
            if (action.payload === 'professor'){
                state.isProfessor = true;
            }else{
                state.isProfessor = false;
            }
        }
    }
})

export const {setUsername, login, logout, setRole} = userSlice.actions;
export default userSlice.reducer