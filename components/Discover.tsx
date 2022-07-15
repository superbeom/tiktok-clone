import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { topics } from "../utils/constants";

const Discover = () => {
  const router = useRouter();
  const { topic } = router.query;

  return (
    <div className="pb-6 xl:border-b-2 xl:border-gray-200">
      <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
        Popular Topics
      </p>

      <div className="flex flex-wrap justify-center xl:justify-start gap-3">
        {topics.map((item) => (
          <Link key={item.name} href={`/?topic=${item.name}`}>
            <div className={topic === item.name ? "activeTopic" : "topic"}>
              <span className="font-bold text-2xl xl:text-lg">{item.icon}</span>
              <span className="font-medium text-lg hidden xl:block">
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
