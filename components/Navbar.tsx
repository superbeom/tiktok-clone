import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";

import Logo from "../utils/logo.png";

const Navbar = () => {
  return (
    <div className="flex w-full justify-between items-center border-b-2 border-gray-200 px-4 py-2">
      <Link href="/">
        <div className="w-[100px] md:w-[130px]">
          <Image
            className="cursor-pointer"
            src={Logo}
            alt="logo"
            layout="responsive"
          />
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
