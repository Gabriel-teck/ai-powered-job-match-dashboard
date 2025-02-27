import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { FilterProvider } from "@/components/FilterContext";
import {  UserProvider } from "@/components/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <FilterProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </FilterProvider>
    </UserProvider>
  );
}
