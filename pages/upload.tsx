import React, { useEffect, useState, BaseSyntheticEvent } from "react";
import { useRouter } from "next/router";
import { SanityAssetDocument } from "@sanity/client";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import useAuthStore from "../store/authStore";
import client from "../utils/client";

const Upload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState<
    undefined | SanityAssetDocument
  >();
  const [wrongFileType, setWrongFileType] = useState(false);

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
    <div className="flex w-full h-full">
      <div className="bg-white rounded-lg">
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
      </div>
    </div>
  );
};

export default Upload;
