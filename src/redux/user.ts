import { createSlice } from "@reduxjs/toolkit";
	
const userSlice = createSlice({
  name: 'user', // 名称 必须
  initialState: { // user的函数初始值
    username: '',
    token: '',
    isLogin: false
  },
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.isLogin = action.payload.isLogin;
    }
  }
})

// 每个reducer 函数会生成对应的 action creators
export const { setUser } = userSlice.actions
export default userSlice.reducer
