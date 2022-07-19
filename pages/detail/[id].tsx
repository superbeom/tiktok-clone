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

interface IProps {
  postDetails: Video;
}

const Detail: NextPage<IProps> = ({ postDetails }) => {
  const router = useRouter();

  const [post, setPost] = useState<Video>(postDetails);
  const [playing, setPlaying] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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
