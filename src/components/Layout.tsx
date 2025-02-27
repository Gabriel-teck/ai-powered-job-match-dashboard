import React, { ReactNode } from "react";
import { Header } from "./Header";


interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="xs:mx-8 md:mx-auto ">
        <main>{children}</main>
      </div>
    </div>
  );
};
