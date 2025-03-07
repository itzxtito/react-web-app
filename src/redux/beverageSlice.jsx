import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://beer9.p.rapidapi.com/?brewery=Berkshire%20brewing%20company';
const API_KEY = 'b232c393cdmsh807e3bbf836b436p164c90jsn5f351fcc9fa1'; // Replace with your actual API key

export const fetchBeverages = createAsyncThunk('beverages/fetchBeverages', async () => {
  const response = await axios.get(API_URL, {
    headers: {
      'X-RapidAPI-Key': 'b232c393cdmsh807e3bbf836b436p164c90jsn5f351fcc9fa1',
      'X-RapidAPI-Host': 'beer9.p.rapidapi.com',
    },
  });
  return response.data;
});

const beverageSlice = createSlice({
  name: 'beverages',
  initialState: { list: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBeverages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBeverages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchBeverages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default beverageSlice.reducer;
