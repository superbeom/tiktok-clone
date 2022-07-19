import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";

import { User } from "../types";

import Logo from "../utils/logo.png";
import { createOrGetUser } from "../utils";

import useAuthStore from "../store/authStore";

const Navbar = () => {
  const {
    userProfile,
    login,
    logout,
  }: {
    userProfile: null | User;
    login: (user: User) => any;
    logout: () => any;
  } = useAuthStore();

  return (
    <div className="flex w-full justify-between items-center border-b-2 border-gray-200 px-4 py-2">
      <Link href="/">
        <div className="w-[100px] md:w-[130px]">
          <Image
            className="cursor-pointer"
            src={Logo}
            alt="logo"
            layout="responsive"
            priority={true}
          />
        </div>
      </Link>

      <div>Search</div>

      <div>
        {userProfile ? (
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2">
                <IoMdAdd className="text-xl" />
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>

            {userProfile.image && (
              <Link href="/">
                <a>
                  <Image
                    className="rounded-full cursor-pointer"
                    width={40}
                    height={40}
                    src={userProfile.image}
                    alt={userProfile.userName}
                  />
                </a>
              </Link>
            )}

            <button
              className="px-2"
              type="button"
              onClick={() => {
                googleLogout();
                logout();
              }}
            >
              <AiOutlineLogout color="red" size={21} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => {
              createOrGetUser(response, login);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
