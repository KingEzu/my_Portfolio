import axios from "axios";
import React, { useEffect, useState } from "react";

const Timeline = () => {
  const [timeline, setTimeline] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    const getAllTimeline = async () => {
      const { data } = await axios.get(
        "https://mern-stack-portfolio-backend-code-7m37.onrender.com/api/v1/timeline/getall",
        { withCredentials: true }
      );
      setTimeline(data.timeline);
    };
    getAllTimeline();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-5">
      <h1 className="text-tubeLight-effect text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
      lg:text-[3.8rem] tracking-[15px] dancing_text mx-auto flex justify-center items-center w-fit">
        Timelines
      </h1>
      
      <ol className="relative border-s border-gray-200 dark:border-gray-700">
        {timeline.slice(0, visibleCount).map((element) => (
          <li className="mb-10 ms-6" key={element._id}>
            <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
              <svg
                className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
              </svg>
            </span>
            <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
              {element.title}
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              {element.timeline.from} - {element.timeline.to ? element.timeline.to : "Present"}
            </time>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              {element.description}
            </p>
          </li>
        ))}
      </ol>

      {visibleCount < timeline.length && (
        <div className="flex justify-center mt-5">
          <button
            onClick={() => setVisibleCount((prev) => prev + 5)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default Timeline;
