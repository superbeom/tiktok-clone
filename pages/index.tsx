import axios from "axios";

import { Video } from "../types";

import VideoCard from "../components/VideoCard";
import NoResults from "../components/NoResults";

interface IProps {
  videos: Video[];
}

const Home = ({ videos }: IProps) => {
  console.log("videos: ", videos);

  return (
    <div className="videos flex flex-col h-full gap-10">
      {videos.length ? (
        videos.map((video: Video) => <VideoCard key={video._id} post={video} />)
      ) : (
        <NoResults text="No Videos" />
      )}
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_PATH}/api/post`
  );

  return {
    props: {
      videos: data,
    },
  };
};
