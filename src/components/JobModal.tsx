import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaRegBookmark } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Image from "next/image";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  requiredSkills: string[];
  matchScore: number;
  description: string;
  type: string;
  thumbnail: string;
  rating: string;
}

interface JobModalProps {
  job: Job;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  applyButton: () => void;
}

export const JobModal: React.FC<JobModalProps> = ({
  job,
  isModalOpen,
  setIsModalOpen,
  applyButton,
}) => {
  return (
    <div
      className="fixed top-0 bottom-0 inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={() => setIsModalOpen(false)}
    >
      <div
        className="bg-white py-14 px-4 rounded-lg shadow-md w-[80%] md:w-[50%] h-[80%] relative "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}

        {/* close button */}
        <div className="absolute right-2 top-2 ">
          <button
            onClick={() => setIsModalOpen(false)}
            className="font-bold text-4xl border rounded-r-lg px-4 py-2 border-white hover:text-red-600 hover:font-bold"
          >
            <IoClose />
          </button>
        </div>
        <div className=" rounded-lg w-full h-[100%] shadow-sm ">
          {/* Header */}
          <div className="shadow-sm">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Image
                    src={job.thumbnail}
                    alt={job.title}
                    width={40}
                    height={40}
                    className="m4-2"
                  />
                  <h2 className="text-lg font-semibold">
                    {job.company}{" "}
                    <span className="text-gray-500">{job.rating}★</span>
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button className="hidden lg:flex bg-gray-300 text-gray-600 px-4 py-2 rounded-lg cursor-pointer">
                  <HiDotsHorizontal />
                </button>
                <button className="hidden lg:flex bg-gray-300 text-gray-600 px-4 py-2 rounded-lg cursor-pointer">
                  <FaRegBookmark />
                </button>
                <button
                  onClick={applyButton}
                  className="bg-blue-800 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-500"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Job Title & Info */}
            <div className="px-4">
              <h1 className="text-xl font-bold mt-3">{job.title}</h1>
              <p className="text-gray-600 text-[14px] mt-2">
                {job.location} •{" "}
                <span className="text-gray-600 text-[12px]">{job.salary}</span>
              </p>
            </div>
          </div>

          {/* Job Details */}
          <div className="mt-4 p-4 rounded-lg">
            <p className="font-medium">
              Job Title:{" "}
              <span className="text-[16px] font-semibold">{job.title}</span>
            </p>
            <p className="font-medium">
              Job Location:{" "}
              <span className="text-[16px] font-semibold">{job.location}</span>
            </p>
            <p className="font-medium">
              Job Type:{" "}
              <span className="text-[16px] font-semibold">{job.type}</span>
            </p>
          </div>

          {/* Description */}
          <div className="mt-4 px-4">
            <h3 className="text-lg font-semibold">Job Description:</h3>
            <p className="text-gray-700 mt-2 text-[16px] sm:text-sm text-wrap">
              {job.description}
            </p>
          </div>

          {/* Required skills */}
          <div className="mt-2 px-4">
            <h3 className="text-base font-semibold">Required Skills:</h3>
            <p className="text-gray-700 mt-2 text-[16px] sm:text-sm">
              {job.requiredSkills.join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
