// import { createSlice } from "@reduxjs/toolkit";
// import { passwordChange, userLogin, userSignup, verifyOTP } from "../actions/authActions";

// const initialState = {
//   loading: false,
//   userInfo: null,
//   error: null,
//   success: false,
//   message: "",
//   isAuth: false,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     resetSignupState: (state) => {
//       state.loading = false;
//       state.success = false;
//       state.error = null;
//     },
//     resetLoginState: (state) => {
//       state.loading = false;
//       state.success = false;
//       state.error = null;
//     },
//     logout: (state) => {
//       if (typeof window !== "undefined") {
//         try {
//           sessionStorage.clear();
//         } catch (error) {
//           console.error("Failed to clear sessionStorage:", error);
//         }
//       }
//       state.userInfo = null;
//       state.isAuth = false;
//       state.success = false;
//       state.error = null;
//     },
//     resetPasswordState: (state) => {
//       state.loading = false;
//       state.success = false;
//       state.error = null;
//       state.message = "";
//     },
//     initializeAuth: (state) => {
//       if (typeof window !== "undefined") {
//         const token = sessionStorage.getItem("token");
//         const userInfo = sessionStorage.getItem("userInfo");

//         if (token && userInfo) {
//           state.isAuth = true;
//           state.token = token;
//           state.userInfo = JSON.parse(userInfo);
//         } else {
//           state.isAuth = false;
//           state.token = null;
//           state.userInfo = null;
//         }
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(userSignup.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(userSignup.fulfilled, (state, { payload }) => {
//         state.loading = false;
//         state.success = true;
//         state.userInfo = payload;
//       })
//       .addCase(userSignup.rejected, (state, { payload }) => {
//         state.loading = false;
//         state.error = payload?.message || "Signup failed";
//       })

//       .addCase(userLogin.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(userLogin.fulfilled, (state, { payload }) => {
//         state.loading = false;
//         state.success = true;
//         console.log(payload);        
//         state.userInfo = payload || null;
//         state.isAuth = true;

//         // ✅ Safe sessionStorage usage (SSR check)
//         if (typeof window !== "undefined") {
//           try {
//             if (payload?.JWTtoken) {
//               sessionStorage.setItem("token", payload.JWTtoken);
//             }
//             if (payload?.username) {
//               sessionStorage.setItem(
//                 "userInfo",
//                 JSON.stringify(payload)
//               );
//             }
//           } catch (error) {
//             console.error("Failed to save login data to sessionStorage:", error);
//           }
//         }
//       })
//       .addCase(userLogin.rejected, (state, { payload }) => {
//         state.loading = false;
//         state.error = payload?.message || "Login failed";
//         state.isAuth = false;
//       })
//       // Login by OTP
//       .addCase(verifyOTP.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(verifyOTP.fulfilled, (state, { payload }) => {
//         state.loading = false;
//         state.success = true;
//         console.log(payload);        
//         state.userInfo = payload || null;
//         state.isAuth = true;

//         // ✅ Safe sessionStorage usage (SSR check)
//         if (typeof window !== "undefined") {
//           try {
//             if (payload?.JWTtoken) {
//               sessionStorage.setItem("token", payload.JWTtoken);
//             }
//             if (payload?.username) {
//               sessionStorage.setItem(
//                 "userInfo",
//                 JSON.stringify(payload)
//               );
//             }
//           } catch (error) {
//             console.error("Failed to save login data to sessionStorage:", error);
//           }
//         }
//       })
//       .addCase(verifyOTP.rejected, (state, { payload }) => {
//         state.loading = false;
//         state.error = payload?.message || "Login failed";
//         state.isAuth = false;
//       })

//       .addCase(passwordChange.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(passwordChange.fulfilled, (state, { payload }) => {
//         state.loading = false;
//         state.success = true;
//         state.message = payload?.message || "Password changed successfully";
//       })
//       .addCase(passwordChange.rejected, (state, { payload }) => {
//         state.loading = false;
//         state.error = payload?.message || "Change password failed";
//       });
//   },
// });

// export const {
//   resetSignupState,
//   resetLoginState,
//   resetPasswordState,
//   logout,
//   initializeAuth,
// } = authSlice.actions;
// export default authSlice.reducer;


/////////////////////////////////////////////////////////////////////////////////

// Worked fine but build not done with the code 
//===================================================

// import { createSlice } from "@reduxjs/toolkit";
// import { passwordChange, userLogin, userSignup, verifyOTP } from "../actions/authActions";

// const initialState = {
//   loading: false,
//   userInfo: null,
//   error: null,
//   success: false,
//   message: "",
//   isAuth: false,
//   token: null,
// };

// const saveAuthToSession = (payload) => {
//   try {
//     if (typeof window !== "undefined") {
      
//       // Save token
//       if (payload?.JWTtoken) {
//         sessionStorage.setItem("token", payload.JWTtoken);
//       }

//       // Save userInfo (ALWAYS when payload exists)
//       if (payload) {
//         sessionStorage.setItem("userInfo", JSON.stringify(payload));
//       }
//     }
//   } catch (error) {
//     console.error("Failed to save login data:", error);
//   }
// };


// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     resetSignupState: (state) => {
//       state.loading = false;
//       state.success = false;
//       state.error = null;
//     },

//     resetLoginState: (state) => {
//       state.loading = false;
//       state.success = false;
//       state.error = null;
//     },

//     logout: (state) => {
//       if (typeof window !== "undefined") {
//         sessionStorage.clear();
//       }
//       state.userInfo = null;
//       state.isAuth = false;
//       state.token = null;
//       state.error = null;
//       state.success = false;
//     },

//     resetPasswordState: (state) => {
//       state.loading = false;
//       state.success = false;
//       state.error = null;
//       state.message = "";
//     },

//     initializeAuth: (state) => {
//       if (typeof window !== "undefined") {
//         const token = sessionStorage.getItem("token");
//         const userInfo = sessionStorage.getItem("userInfo");

//         if (token && userInfo) {
//           state.isAuth = true;
//           state.token = token;
//           state.userInfo = JSON.parse(userInfo);
//         } else {
//           state.isAuth = false;
//           state.token = null;
//           state.userInfo = null;
//         }
//       }
//     },
//   },

//   extraReducers: (builder) => {
//     builder
//       // ⭐ Sign Up
//       .addCase(userSignup.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(userSignup.fulfilled, (state, { payload }) => {
//         state.loading = false;
//         state.success = true;
//         state.message = payload?.message || "Signup successful";
//       })
//       .addCase(userSignup.rejected, (state, { payload }) => {
//         state.loading = false;
//         state.error = payload?.message || "Signup failed";
//       })

//       // ⭐ OTP Verify Login
//       .addCase(verifyOTP.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(verifyOTP.fulfilled, (state, { payload }) => {
//         state.loading = false;
//         state.success = true;
//         console.log(payload);
        

//         if (payload?.JWTtoken) {
//           state.userInfo = payload;
//           state.token = payload.JWTtoken;
//           state.isAuth = true;
//           saveAuthToSession(payload);
//         }
//       })
//       .addCase(verifyOTP.rejected, (state, { payload }) => {
//         state.loading = false;
//         state.error = payload?.message || "OTP verification failed";
//         state.isAuth = false;
//       })

//       // ⭐ Password Login
//       .addCase(userLogin.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(userLogin.fulfilled, (state, { payload }) => {
//         state.loading = false;
//         state.success = true;

//         if (payload?.JWTtoken) {
//           state.userInfo = payload;
//           state.token = payload.JWTtoken;
//           state.isAuth = true;
//           saveAuthToSession(payload);
//         } else {
//           // OTP Request Case (no token yet)
//           state.message = payload?.message;
//         }
//       })
//       .addCase(userLogin.rejected, (state, { payload }) => {
//         state.loading = false;
//         state.error = payload?.message || "Login failed";
//         state.isAuth = false;
//       })

//       // ⭐ Password Change
//       .addCase(passwordChange.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(passwordChange.fulfilled, (state, { payload }) => {
//         state.loading = false;
//         state.success = true;
//         state.message = payload?.message || "Password changed";
//       })
//       .addCase(passwordChange.rejected, (state, { payload }) => {
//         state.loading = false;
//         state.error = payload?.message || "Password change failed";
//       });
//   },
// });

// export const {
//   resetSignupState,
//   resetLoginState,
//   resetPasswordState,
//   logout,
//   initializeAuth,
// } = authSlice.actions;

// export default authSlice.reducer;


///////////////////////////////////////////////////////////////////////////////////


import { createSlice } from "@reduxjs/toolkit";
import {
  passwordChange,
  userLogin,
  userSignup,
  verifyOTP,
} from "../actions/authActions";

const initialState = {
  loading: false,
  userInfo: null,
  error: null,
  success: false,
  message: "",
  isAuth: false,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    // ✅ Used by StoreProvider
    setAuthFromSession: (state, action) => {
      state.isAuth = true;
      state.token = action.payload.token;
      state.userInfo = action.payload.userInfo;
    },

    logout: (state) => {
      state.userInfo = null;
      state.isAuth = false;
      state.token = null;
      state.error = null;
      state.success = false;
      state.message = "";
    },

    resetLoginState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },

    resetSignupState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },

    resetPasswordState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder
      // ⭐ Signup
      .addCase(userSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userSignup.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.message = payload?.message || "Signup successful";
      })
      .addCase(userSignup.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.message || "Signup failed";
      })

      // ⭐ OTP Verify
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;

        if (payload?.JWTtoken) {
          state.userInfo = payload;
          state.token = payload.JWTtoken;
          state.isAuth = true;
        }
      })
      .addCase(verifyOTP.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.message || "OTP verification failed";
        state.isAuth = false;
      })

      // ⭐ Password Login
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;

        if (payload?.JWTtoken) {
          state.userInfo = payload;
          state.token = payload.JWTtoken;
          state.isAuth = true;
        } else {
          state.message = payload?.message;
        }
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.message || "Login failed";
        state.isAuth = false;
      })

      // ⭐ Password Change
      .addCase(passwordChange.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(passwordChange.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.message = payload?.message || "Password changed";
      })
      .addCase(passwordChange.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.message || "Password change failed";
      });
  },
});

export const {
  setAuthFromSession,
  logout,
  resetLoginState,
  resetSignupState,
  resetPasswordState,
} = authSlice.actions;

export default authSlice.reducer;

