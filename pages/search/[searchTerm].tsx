import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { GoVerified } from "react-icons/go";
import axios from "axios";

import { User, Video } from "../../types";

import useAuthStore from "../../store/authStore";

import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";

interface IProps {
  videos: Video[] | null;
}

const Search = ({ videos }: IProps) => {
  const router = useRouter();
  const { searchTerm } = router.query;

  const [isAccounts, setIsAccounts] = useState<boolean>(false);

  const { allUsers } = useAuthStore();

  const searchedAccounts =
    typeof searchTerm === "string"
      ? allUsers.filter((user) =>
          user.userName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  if (!videos) return <div>Not exist</div>;

  return (
    <div className="w-full">
      <div className="flex gap-10 my-10 border-b-2 border-gray-200 bg-white w-full">
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${
            isAccounts ? "border-b-2 border-black" : "text-gray-400"
          }`}
          onClick={() => setIsAccounts(true)}
        >
          Accounts
        </p>

        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${
            isAccounts ? "text-gray-400" : "border-b-2 border-black"
          }`}
          onClick={() => setIsAccounts(false)}
        >
          Videos
        </p>
      </div>

      {isAccounts ? (
        <div>
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map((user) => (
              <Link key={user._id} href={`/profile/${user._id}`}>
                <div className="flex gap-3 px-2 py-4 cursor-pointer font-semibold rounded border-b-2 border-gray-200">
                  <Image
                    className="rounded-full"
                    width={50}
                    height={50}
                    alt={user.userName}
                    src={user.image}
                  />

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
            ))
          ) : (
            <NoResults text={`No video results for '${searchTerm}'`} />
          )}
        </div>
      ) : (
        <div className="flex flex-wrap gap-6 md:justify-start md:mt-16">
          {videos.length > 0 ? (
            videos.map((video) => <VideoCard key={video._id} post={video} />)
          ) : (
            <NoResults text={`No video results for '${searchTerm}'`} />
          )}
        </div>
      )}
    </div>
  );
};

export default Search;

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const {
    data: { videos },
  } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_PATH}/api/search/${searchTerm}`
  );

  return {
    props: {
      videos,
    },
  };
};
