import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = { userDetails: {}}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserDetails: (state, actions)=>{
      state.userDetails= actions.payload
    },
    logOutUser: (state)=>{
      state.userDetails = {}
    }
  },
})

export const { addUserDetails, logOutUser} = userSlice.actions
export default userSlice.reducer
