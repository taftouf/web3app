import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import connect from '../../sevices/connection';

export const connectWallet = createAsyncThunk('', async(_,thunkAPI)=>{
  try {
      const data = await connect();
      return data;
  } catch (error) {
      console.log(error);
  }
})


export const accountSlice = createSlice({
  name: 'account',
  initialState: {
    address:null, 
    chainId:"", 
    balance:"",
    status:""
  },
  reducers: {
    disconnection: state => {
        state.address   = null;
        state.balance   = "";
        state.chainId   = "";
    }
  },
  extraReducers:{
    [connectWallet.pending]:(state, action)=>{
        console.log(action);
        state.status = "Loading";
    },
    [connectWallet.fulfilled]:(state, action)=>{
       
        state.status  = action.payload.status;
        state.balance = action.payload.balance;
        state.address = action.payload.address;
        state.chainId = action.payload.chainId
    },
    [connectWallet.rejected]:(state, action)=>{
        console.log(action);
        state.status= action.payload.status;
        state.address= null;
    },
}
})

// Action creators are generated for each case reducer function
export const { connection, disconnection } = accountSlice.actions

export default accountSlice.reducer