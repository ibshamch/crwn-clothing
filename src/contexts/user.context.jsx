import { createContext, useState } from "react";

// actual value you want to access
const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };
  console.log(value);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
