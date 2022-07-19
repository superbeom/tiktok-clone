import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";

import { Video } from "../types";

interface IProps {
  post: Video;
}

const VideoCard = ({ post }: IProps) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleHover = (type: boolean) => setIsHover(type);
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

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);

  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
          <div className="w-10 h-10 md:w-16 md:h-16">
            <Link href="/">
              <>
                <Image
                  className="rounded-full"
                  width={62}
                  height={62}
                  src={post.postedBy.image}
                  alt={post.postedBy.userName}
                  layout="responsive"
                />
              </>
            </Link>
          </div>

          <div>
            <Link href="/">
              <div className="flex items-center gap-2">
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
      </div>

      <div className="lg:ml-20 flex gap-4 relative">
        <div
          onMouseEnter={() => toggleHover(true)}
          onMouseLeave={() => toggleHover(false)}
          className="rounded-3xl"
        >
          <Link href={`/detail/${post._id}`}>
            <video
              ref={videoRef}
              loop
              className="w-[200px] lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] rounded-2xl cursor-pointer bg-gray-100"
              src={post.video.asset.url}
            />
          </Link>

          {isHover && (
            <div className="absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] p-3">
              <button onClick={togglePlay}>
                {playing ? (
                  <BsFillPauseFill className="icon" />
                ) : (
                  <BsFillPlayFill className="icon" />
                )}
              </button>

              <button onClick={() => toggleMute(isVideoMuted ? false : true)}>
                {isVideoMuted ? (
                  <HiVolumeOff className="icon" />
                ) : (
                  <HiVolumeUp className="icon" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
