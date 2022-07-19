import React, { SetStateAction, Dispatch, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";

import useAuthStore from "../store/authStore";

import NoResults from "./NoResults";

import { User } from "../types";

interface IComment {
  _key: string;
  comment: string;
  postedBy: User;
  length?: number;
}

interface IProps {
  comments: IComment[];
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: FormEvent) => Promise<void>;
  isPostingComment: boolean;
}

const Comments = ({
  comments,
  comment,
  setComment,
  addComment,
  isPostingComment,
}: IProps) => {
  const { userProfile } = useAuthStore();

  return (
    <div className="border-y-2 border-gray-200 pt-4 px-10 bg-lightWhiteColor pb-[100px] lg:pb-0">
      <div className="overflow-scroll lg:h-[475px]">
        {comments?.length ? (
          <div>video</div>
        ) : (
          <NoResults text="No comments yet" />
        )}
      </div>

      {userProfile && (
        <div className="absolute bottom-0 left-0 px-2 pb-6 md:px-10">
          <form className="flex gap-4" onSubmit={addComment}>
            <input
              className="flex-1 bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:boder-2 focus:border-gray-300 rounded-lg"
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add comment..."
            />
            {/* <button className="text-md text-gray-400" onClick={() => null}>
              {isPostingComment ? "Commenting..." : "Comment"}
            </button> */}
            <input
              className="text-md text-gray-400"
              type="submit"
              value={isPostingComment ? "Commenting..." : "Comment"}
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;
