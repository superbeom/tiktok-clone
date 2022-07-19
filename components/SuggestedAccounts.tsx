import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { GoVerified } from "react-icons/go";

import { User } from "../types";

import useAuthStore from "../store/authStore";

const SuggestedAccounts = () => {
  const { allUsers, fetchAllUsers } = useAuthStore();

  useEffect(() => {
    fetchAllUsers();
  }, [allUsers]);

  return (
    <div className="xl:border-b-2 border-gray-200 pb-4">
      <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
        Suggested Accounts
      </p>

      <div>
        {allUsers.slice(0, 6).map((user: User) => (
          <Link key={user._id} href={`/profile/${user._id}`}>
            <div className="flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded">
              <div className="w-8 h-8">
                <Image
                  className="rounded-full"
                  width={34}
                  height={34}
                  alt={user.userName}
                  src={user.image}
                  layout="responsive"
                />
              </div>

              <div className="hidden xl:block">
                <p className="flex gap-1 items-center font-bold text-primary lowercase">
                  {user.userName.replace(" ", "")}
                  <GoVerified className="text-blue-400 text-sm" />
                </p>

                <p className="capitalize text-gray-400 text-xs">
                  {user.userName}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SuggestedAccounts;
