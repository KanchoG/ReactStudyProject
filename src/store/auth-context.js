import react, { useState, useEffect, useCallback } from "react";
const AuthContext = react.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

let logoutTimer;

const calculateTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const timeAdjust = new Date(expirationTime).getTime();
  const remainingTime = timeAdjust - currentTime;
  return remainingTime;
};

const storageRetrieve = () => {
  const storedToken = localStorage.getItem("token");
  const storedTime = localStorage.getItem("expTime");

  const remainingTime = calculateTime(storedTime);

  if (remainingTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expTime");
    return null;
  }
  return {
    token: storedToken,
    duration: remainingTime,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = storageRetrieve();
  let initilaToken;
  if (tokenData) {
    initilaToken = tokenData.token;
  }
  const [token, setToken] = useState(initilaToken);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback( () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expTime");
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  },[]);

  const loginHandeler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expTime", expirationTime);
    const remainingTime = calculateTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);
  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandeler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
