import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Metamaskconnect } from '../../sevices/connection';

export const connection = createAsyncThunk('', async(_,thunkAPI)=>{
  try {
      const data = await Metamaskconnect();
      console.log(data);
      return data;
  } catch (error) {
      console.log(error.message);
  }
});

export const accountSlice = createSlice({
  name: 'account',
  initialState: {
    address:"",
    wallet:""
  },
  reducers: {
    changeAddress: (state, action) => {
      state.address = action.payload
    },
    changeWallet: (state, action) => {
      state.wallet = action.payload
      console.log(state.wallet, action.payload);
    },
    disconnection: state => {
        console.log("logout");
    }
  },
  extraReducers:{
    [connection.pending]:(state, action)=>{
        state.address = "";
        state.wallet = "";
    },
    [connection.fulfilled]:(state, action)=>{
        state.address = action.payload.address;
        state.wallet  = action.payload.wallet;
    },
    [connection.rejected]:(state, action)=>{
        state.address= "";
        state.wallet = "";
    },
  }
})


export const { disconnection, changeAddress, changeWallet } = accountSlice.actions

export default accountSlice.reducer