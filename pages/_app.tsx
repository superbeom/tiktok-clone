import "../styles/globals.css";

import { useState, useEffect } from "react";
import type { AppProps } from "next/app";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setisSSR] = useState(true);

  useEffect(() => {
    setisSSR(false);
  }, []);

  if (isSSR) return null;

  return (
    <div>
      <Navbar />

      <div className="flex gap-6 md:gap-20">
        <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
          <Sidebar />
        </div>

        <div className="flex flex-col flex-1 h-[88vh] gap-10 overflow-auto mt-4 videos">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
};

export default MyApp;
