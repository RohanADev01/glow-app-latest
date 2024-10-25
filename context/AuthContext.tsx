import React, { createContext, ReactNode, useContext, useState } from 'react';

// Define the Auth context
interface AuthContextProps {
  isSignedIn: boolean;
  setSignedIn: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isSignedIn, setSignedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isSignedIn, setSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
