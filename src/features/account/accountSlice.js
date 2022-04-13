import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {_walletconnect} from '../../sevices/connection';



export const connection = createAsyncThunk('', async(n,thunkAPI)=>{
  try {
      const data = await _walletconnect(n);
      return data;
  } catch (error) {
      console.log(error.message);
  }
})


export const accountSlice = createSlice({
  name: 'account',
  initialState: {
    address:"",
  },
  reducers: {
    changeAddress: (state, action) => {
      state.address = action.payload
    },
    disconnection: state => {
        console.log("logout");
    }
  },
  extraReducers:{
    [connection.pending]:(state, action)=>{
        state.address = "";
    },
    [connection.fulfilled]:(state, action)=>{
        console.log(action.payload.address);
        state.address = action.payload.address;
    },
    [connection.rejected]:(state, action)=>{
        state.address= "";
    },
  }
})


export const { disconnection, changeAddress } = accountSlice.actions

export default accountSlice.reducer