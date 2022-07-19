import React, { useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";

import { PostedBy } from "../types";

import useAuthStore from "../store/authStore";

interface IProps {
  likes: PostedBy[];
  toggleLike: (like: boolean) => Promise<void>;
}

const LikeButton = ({ likes, toggleLike }: IProps) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const { userProfile } = useAuthStore();

  const filterLikes = likes?.filter(
    (item) => item._ref === userProfile?._id || item._id === userProfile?._id
  );

  useEffect(() => {
    if (filterLikes?.length > 0) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [filterLikes]);

  return (
    <div className="flex gap-6">
      <div className="mt-4 flex flex-col justify-center items-center">
        <div
          className={`bg-primary rounded-full p-2 md:p-4 cursor-pointer ${
            alreadyLiked ? "text-pinkColor" : "text-gray-400"
          }`}
          onClick={() => toggleLike(alreadyLiked ? false : true)}
        >
          <MdFavorite className="text-lg md:text-2xl" />
        </div>

        <p className="text-md font-semibold">{likes?.length || 0}</p>
      </div>
    </div>
  );
};

export default LikeButton;
