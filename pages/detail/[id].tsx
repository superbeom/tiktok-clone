import React, { useEffect, useState, useRef } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { GoVerified } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPlayFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";

import { Video } from "../../types";

import useAuthStore from "../../store/authStore";

import LikeButton from "../../components/LikeButton";
import Comments from "../../components/Comments";

interface IProps {
  postDetails: Video;
}

const Detail: NextPage<IProps> = ({ postDetails }) => {
  const router = useRouter();

  const [post, setPost] = useState<Video>(postDetails);
  const [playing, setPlaying] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { userProfile } = useAuthStore();

  console.log("post: ", post);

  const toggleMute = (type: boolean) => setIsVideoMuted(type);

  const togglePlay = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  const closePost = () => router.back();

  const toggleLike = async (like: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_PATH}/api/like`,
        {
          userId: userProfile._id,
          postId: post._id,
          like,
        }
      );

      setPost((curPost) => ({ ...curPost, likes: data.likes }));
    }
  };

  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [post, isVideoMuted]);

  if (!post) return <div>Not exist</div>;

  return (
    <div className="absolute top-0 left-0 flex flex-wrap lg:flex-nowrap w-full bg-white">
      <div className="relative flex flex-2 justify-center items-center w-[1000x] lg:w-[75%] bg-black">
        <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-20">
          <p className="cursor-pointer" onClick={closePost}>
            <MdOutlineCancel className="text-white text-[35px]" />
          </p>
        </div>

        <div className="relative">
          <div className="h-[60vh] lg:h-[100vh]">
            <video
              ref={videoRef}
              className="h-full cursor-pointer"
              loop
              src={post.video.asset.url}
              onClick={togglePlay}
            />
          </div>

          <div className="absolute top-[45%] left-[45%]">
            {!playing && (
              <button type="button" onClick={togglePlay}>
                <BsFillPlayFill className="text-white text-6xl lg:text-8xl" />
              </button>
            )}
          </div>
        </div>

        <div className="absolute bottom-5 right-5 lg:bottom-10 lg:right-10 cursor-pointer">
          <button onClick={() => toggleMute(isVideoMuted ? false : true)}>
            {isVideoMuted ? (
              <HiVolumeOff className="whiteIcon" />
            ) : (
              <HiVolumeUp className="whiteIcon" />
            )}
          </button>
        </div>
      </div>

      <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
        <div className="px-5 py-2 mt-10 lg:mt-20 border-2 border-red-700">
          <div className="flex gap-3 cursor-pointer font-semibold rounded">
            <div className="w-16 h-16 md:w-20 md:h-20">
              <Link href="/">
                <>
                  <Image
                    className="rounded-full"
                    width={62}
                    height={62}
                    src={post.postedBy.image}
                    alt={post.postedBy.userName}
                    layout="responsive"
                    priority={true}
                  />
                </>
              </Link>
            </div>

            <div>
              <Link href="/">
                <div className="flex flex-col gap-2 mt-3">
                  <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                    {post.postedBy.userName}
                    <GoVerified className="text-blue-400 text-md" />
                  </p>

                  <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                    {post.postedBy.userName}
                  </p>
                </div>
              </Link>
            </div>
          </div>

          <p className="px-5 text-lg text-gray-600">{post.caption}</p>

          <div className="px-10 mt-10">
            {userProfile && (
              <LikeButton likes={post.likes} toggleLike={toggleLike} />
            )}
          </div>

          <Comments />
        </div>
      </div>
    </div>
  );
};

export default Detail;

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_PATH}/api/post/${id}`
  );

  return {
    props: {
      postDetails: data,
    },
  };
};
