
import React from "react";
import { createContext, useContext, useState, ReactNode } from "react";




//Filter context
interface FilterContextType {
  searchJobTitle: string;
  setSearchJobTitle: (query: string) => void;
  searchLocation: string;
  setSearchLocation: (query: string) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchJobTitle, setSearchJobTitle] = useState<string>("");
  const [searchLocation, setSearchLocation] = useState<string>("");

  return (
    <FilterContext.Provider
      value={{
        searchJobTitle,
        setSearchJobTitle,
        searchLocation,
        setSearchLocation,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);

  if (context === undefined) {
    throw new Error("useFilter must be used within a filterProvider");
  }

  return context;
};
