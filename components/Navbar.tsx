import React, { useState, FormEvent } from "react";
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
  const router = useRouter();

  const [searchValue, setSearchValue] = useState<string>("");

  const { userProfile, login, logout } = useAuthStore();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    if (!searchValue) return;

    router.push(`/search/${searchValue}`);
  };

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

      <div className="relative hidden md:block">
        <form
          className="absolute md:static top-10 -left-20 bg-white"
          onSubmit={handleSearch}
        >
          <input
            className="bg-primary px-5 py-3 font-medium border-2 border-gray-100 focus:outline-gray-300 w-[300px] md:w-[350px] md:top-0 rounded-full"
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search accounts and videos"
          />

          <button
            className="absolute right-6 top-4 md:right-5 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400"
            onClick={handleSearch}
          >
            <BiSearch />
          </button>
        </form>
      </div>

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
