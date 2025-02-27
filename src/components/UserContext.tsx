import React from "react";
import { createContext, useContext, useState, ReactNode } from "react";


//User context
interface UserContextType {
  skills: string[];
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [skills] = useState<string[]>(["React.js", "Next.js", "JavaScript", "TailwindCSS", "TypeScript", "Redux"]);
  return (
    <UserContext.Provider value={{ skills }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if(!context) {
throw new Error("useUser must be used within a UserProvider");

    }
    return context;
}