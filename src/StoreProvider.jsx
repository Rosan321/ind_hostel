// "use client";

// import { useRef, useEffect } from "react";
// import { Provider } from "react-redux";
// import { makeStore } from "./lib/store/store";
// import { initializeAuth } from "./lib/store/reducers/authSlice";

// const StoreProvider = ({ children }) => {
//   const storeRef = useRef(undefined);

//   if (!storeRef.current) {
//     storeRef.current = makeStore();
//   }

//   useEffect(() => {
//     storeRef.current.dispatch(initializeAuth());
//   }, []);

//   return <Provider store={storeRef.current}>{children}</Provider>;
// };

// export default StoreProvider;


/////////////////////////////////////////////////////////////////////


"use client";

import { useRef, useEffect } from "react";
import { Provider } from "react-redux";
import { makeStore } from "./lib/store/store";
import { setAuthFromSession } from "./lib/store/reducers/authSlice";

const StoreProvider = ({ children }) => {
  const storeRef = useRef(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    // ✅ SAFE: runs only in browser
    const token = sessionStorage.getItem("token");
    const userInfo = sessionStorage.getItem("userInfo");

    if (token && userInfo) {
      storeRef.current.dispatch(
        setAuthFromSession({
          token,
          userInfo: JSON.parse(userInfo),
        })
      );
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
