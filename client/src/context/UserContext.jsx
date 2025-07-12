import { Children, createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // fn to update user data
  const updateUser = (userData) => {
    setUser(userData);
  };
  // fn to clear user data
  const clearUser = () => {
    setUser(null);
  };
  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;