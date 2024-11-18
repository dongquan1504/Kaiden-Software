import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserProp {
  // id: string;
  name: string;
  password: string;
  // price: number;
}

interface UserState {
  user: UserProp | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initializeUser(state, action: PayloadAction<UserProp | null>) {
      state.user = action.payload;
    },
    setUser(state, action: PayloadAction<UserProp>) {
      state.user = action.payload;
      // if (state.user) {
      // }
    },
  },
});

export const { initializeUser, setUser } = userSlice.actions;

export default userSlice.reducer;