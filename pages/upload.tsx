import React, { useEffect, useState, BaseSyntheticEvent } from "react";
import { useRouter } from "next/router";
import { SanityAssetDocument } from "@sanity/client";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import useAuthStore from "../store/authStore";
import client from "../utils/client";
import { topics } from "../utils/constants";

// TODO - 로그인되어 있지 않으면 >> 로그인 하라는 안내로 대체해야 함
const Upload = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [videoAsset, setVideoAsset] = useState<
    undefined | SanityAssetDocument
  >();
  const [wrongFileType, setWrongFileType] = useState<boolean>(false);
  const [caption, setCaption] = useState<string>("");
  const [category, setCategory] = useState<string>(topics[0].name);
  const [savingPost, setSavingPost] = useState<boolean>(false);

  const { userProfile } = useAuthStore();

  const handlePost = async () => {
    if (videoAsset?._id && caption && category) {
      setSavingPost(true);

      const document = {
        _type: "post",
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: videoAsset._id,
          },
        },
        userId: userProfile._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile._id,
        },
        topic: category,
      };

      await axios.post("http://localhost:3000/api/post", document);

      router.push("/");
    }
  };

  const handleDiscard = () => {
    setVideoAsset(undefined);
    setCaption("");
    setCategory(topics[0].name);
    setSavingPost(false);
  };

  const uploadVideo = async (e: BaseSyntheticEvent) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];

    console.log("selectedFile: ", selectedFile);

    if (fileTypes.includes(selectedFile.type)) {
      setIsLoading(true);
      setWrongFileType(false);

      const imageAsset = await client.assets.upload("file", selectedFile, {
        contentType: selectedFile.type,
        filename: selectedFile.name,
      });

      console.log("imageAsset: ", imageAsset);

      setVideoAsset(imageAsset);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setWrongFileType(true);
    }
  };

  return (
    <div className="flex w-full h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-lightWhite justify-center">
      <div className="bg-white rounded-lg flex flex-wrap gap-6 justify-center items-center md:w-[80vw] md:justify-evenly xl:h-[80vh] p-14 pt-6">
        <div>
          <div>
            <p className="text-2xl font-bold">Upload Video</p>
            <p className="text-md text-gray-400 mt-1">
              Post a video to your account
            </p>
          </div>

          <div
            className="flex flex-col justify-center items-center w-[260px] h-[460px]
                       border-dashed border-4 border-gray-200 rounded-xl outline-none
                       mt-10 p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100 relative"
          >
            {isLoading ? (
              <p>Uploading...</p>
            ) : (
              <div>
                {videoAsset ? (
                  <div className="absolute top-0 left-0">
                    <video
                      className="h-[450px] bg-black rounded-xl"
                      loop
                      controls
                      src={videoAsset.url}
                    />
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <div className="flex flex-col justify-center items-center h-full">
                      <div className="flex flex-col justify-center items-center">
                        <p>
                          <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                        </p>
                        <p className="font-semibold text-xl text-gray-500">
                          Upload Video
                        </p>
                      </div>

                      <p className="text-gray-400 text-center mt-10 text-sm leading-6">
                        MP4 or WebM or ogg <br />
                        720x1280 or higher <br />
                        Up to 10 minutes <br />
                        Less than 2GB
                      </p>

                      <p className="bg-pinkColor text-center mt-10 rounded text-white text-md font-medium p-2 w-52">
                        Select File
                      </p>
                    </div>

                    <input
                      className="w-0 h-0"
                      type="file"
                      name="upload-video"
                      onChange={uploadVideo}
                    />
                  </label>
                )}
              </div>
            )}

            {wrongFileType && (
              <p className="text-center text-lg text-red-400 font-semibold mt-4 w-[250px]">
                Please select a video file
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 pb-10">
          <label className="text-md font-medium">Caption</label>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="rounded outline-red-300 text-md border-2 border-gray-200 p-2"
          />

          <label className="text-md font-medium">Choose a Category</label>
          <select
            name="topic"
            className="outline-red-300 border-2 border-gray-200 px-2 py-3 rounded capitalize cursor-pointer"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {topics.map((topic) => (
              <option key={topic.name} value={topic.name}>
                {topic.name}
              </option>
            ))}
          </select>

          <div className="flex gap-6 mt-10">
            <button
              className="border-gray-300 border-2 text-lg font-medium p-2 rounded w-28 lg:w-44 outline-none"
              type="button"
              onClick={handleDiscard}
            >
              Discard
            </button>

            <button
              className={`${
                !videoAsset?._id || !caption || !category
                  ? "bg-gray-300 text-gray-500"
                  : "bg-pinkColor text-white"
              } text-lg font-medium p-2 rounded w-28 lg:w-44 outline-none`}
              type="button"
              onClick={handlePost}
              disabled={!videoAsset?._id || !caption || !category}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
