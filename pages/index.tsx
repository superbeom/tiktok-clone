import axios from "axios";

import { Video } from "../types";

import VideoCard from "../components/VideoCard";
import NoResults from "../components/NoResults";

interface IProps {
  videos: Video[];
}

const Home = ({ videos }: IProps) => (
  <div className="videos flex flex-col h-full gap-10">
    {videos.length ? (
      videos.map((video: Video) => <VideoCard key={video._id} post={video} />)
    ) : (
      <NoResults text="No Videos" />
    )}
  </div>
);

export default Home;

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let videos;

  if (topic) {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_PATH}/api/discover/${topic}`
    );

    videos = data ?? [];
  } else {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_PATH}/api/post`
    );

    videos = data;
  }

  return {
    props: {
      videos,
    },
  };
};
