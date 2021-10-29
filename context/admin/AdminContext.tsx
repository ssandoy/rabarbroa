import React, { Dispatch, SetStateAction, useMemo, useState } from "react";

type AdminState = {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
};

const AdminContext = React.createContext<AdminState | undefined>(undefined);

const AdminProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const value: AdminState = useMemo(
    () => ({
      isLoggedIn,
      setIsLoggedIn,
    }),
    [isLoggedIn]
  );

  return <AdminContext.Provider value={value} {...props} />;
};

const useAdminContext = () => {
  const context = React.useContext(AdminContext);
  if (!context) {
    throw new Error(`useAdminContext must be used within a AdminProvider`);
  }
  return context;
};

export { AdminProvider, useAdminContext };
