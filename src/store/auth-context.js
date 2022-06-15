import react, { useState, useEffect, useCallback } from "react";
const AuthContext = react.createContext({
  token: "",
  isLoggedIn: false,
  userName: "",
  userSet: (user) => {},
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
  const storedUserName = localStorage.getItem("user");

  const remainingTime = calculateTime(storedTime);

  if (remainingTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expTime");
    return null;
  }
  return {
    token: storedToken,
    duration: remainingTime,
    user: storedUserName,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = storageRetrieve();
  let initilaToken;
  let initialUser = "";
  if (tokenData) {
    initilaToken = tokenData.token;
    initialUser = tokenData.user;
  }

  const [token, setToken] = useState(initilaToken);
  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expTime");
    localStorage.removeItem("user");
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const userHandler = (user) => {
    localStorage.setItem("user", user);
  };
  const loginHandeler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expTime", expirationTime);
    
    const remainingTime = calculateTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);
  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    userName: initialUser,
    userSet: userHandler,
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
