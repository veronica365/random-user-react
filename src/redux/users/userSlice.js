import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('https://randomuser.me/api/?results=5');
      return data.results;
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong');
    }
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setUsers: (state, action) => ({
      ...state,
      users: action.payload,
    }),
  },
  extraReducers: {
    [getUsers.pending]: (state) => ({
      ...state,
      isLoading: true,
    }),
    [getUsers.fulfilled]: (state, { payload }) => ({
      ...state,
      isLoading: false,
      users: payload || state.users,
    }),
    [getUsers.rejected]: (state) => ({
      ...state,
      isLoading: false,
    }),
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
