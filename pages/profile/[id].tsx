import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";

import { User, Video } from "../../types";

import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";

interface IProps {
  user: User;
  userVideos: Video[];
  userLikedVideos: Video[];
}

const Profile = ({ data }: { data: IProps | null }) => {
  const [user, setUser] = useState<User | null>(data?.user ?? null);
  const [userVideos, setUserVideos] = useState<Video[] | null>(
    data?.userVideos ?? null
  );
  const [userLikedVideos, setUserLikedVideos] = useState<Video[] | null>(
    data?.userLikedVideos ?? null
  );

  const [showUserVideos, setShowUservideos] = useState<boolean>(true);
  const [videosList, setVideosList] = useState<Video[] | null>(
    data?.userVideos ?? null
  );

  useEffect(() => {
    if (showUserVideos) {
      setVideosList(userVideos);
    } else {
      setVideosList(userLikedVideos);
    }
  }, [showUserVideos]);

  if (!user || !userVideos || !userLikedVideos) return <div>Not exist</div>;

  return (
    <div className="w-full">
      <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
        <div className="w-16 h-16 md:w-32 md:h-32">
          <Image
            className="rounded-full"
            width={120}
            height={120}
            alt={user.userName}
            src={user.image}
            layout="responsive"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="flex gap-1 justify-center items-center font-bold md:text-2xl tracking-wider text-primary lowercase">
            {user.userName.replace(" ", "")}
            <GoVerified className="text-blue-400 text-sm" />
          </p>

          <p className="capitalize text-gray-400 text-xs md:text-xl">
            {user.userName}
          </p>
        </div>
      </div>

      <div>
        <div className="flex gap-10 my-10 border-b-2 border-gray-200 bg-white w-full">
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${
              showUserVideos ? "border-b-2 border-black" : "text-gray-400"
            }`}
            onClick={() => setShowUservideos(true)}
          >
            Videos
          </p>

          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${
              showUserVideos ? "text-gray-400" : "border-b-2 border-black"
            }`}
            onClick={() => setShowUservideos(false)}
          >
            Liked
          </p>
        </div>

        <div className="flex flex-wrap gap-6 md:justify-start">
          {videosList && videosList.length > 0 ? (
            videosList.map((post: Video) => (
              <VideoCard key={post._id} post={post} />
            ))
          ) : (
            <NoResults
              text={`No ${showUserVideos ? "" : "liked"} videos yet`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_PATH}/api/profile/${id}`
  );

  return {
    props: {
      data,
    },
  };
};
