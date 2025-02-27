import React, { useEffect, useState } from "react";
import { FaRegBookmark } from "react-icons/fa6";
import { AiFillThunderbolt } from "react-icons/ai";
import { useUser } from "./UserContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { JobModal } from "./JobModal";
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
  active: string;
}

interface JobCardProps {
  job: Job;
  userSkills: string[];
  showProgressBar?: boolean;
}

export const JobList: React.FC<JobCardProps> = ({
  job,
  userSkills,
  showProgressBar,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { skills } = useUser();

  const scoreColor =
    job.matchScore >= 80
      ? "bg-green-800"
      : job.matchScore >= 50
      ? "bg-yellow-500"
      : "bg-red-500";

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isModalOpen]);

  //   This function handles the apply button

  const applyButton = () => {
    const missingSkills = job.requiredSkills.filter(
      (skill) => !skills.includes(skill)
    );

    const acquiredSkills = job.requiredSkills.length - missingSkills.length;

    if (acquiredSkills >= 3) {
      toast.success(
        "Application successful! 🎉 We will get back to you soon.",
        {
          position: "top-center",
          autoClose: 3000,
        }
      );
    } else {
      toast.warning(
        `You need at least 3 required skills to apply. Missing: ${missingSkills.join(
          ", "
        )}. Consider upskilling.`,
        {
          position: "top-center",
          autoClose: 5000,
        }
      );
    }
  };

  return (
    <>
      <div
        onClick={() => setIsModalOpen(!isModalOpen)}
        className=" shadow-md p-4 rounded  bg-white cursor-pointer space-y-2"
      >
        <div className="flex justify-between">
          <div className="flex">
            <Image src={job.thumbnail} alt={job.title} width={60} height={60} />

            <div className="ml-4">
              <p className="text-gray-700 mb-0 text-lg xs:text-base xs:mb-1">{job.company}</p>
              <h2 className="font-bold text-2xl xs:text-base ">{job.title}</h2>
            </div>
          </div>
          <div>
            <FaRegBookmark />
          </div>
        </div>

        <p className="font-normal">
          {job.location} . {job.type}
        </p>
        <p className="text-red-700 font-[600] text-sm ">{job.salary}</p>

        {showProgressBar && (
          <div className="mt-2">
            <p className="font-light">Match Score: {job.matchScore}%</p>
            <div className="w-[60%] bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${scoreColor}`}
                style={{ width: `${job.matchScore}%` }}
              ></div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <button className="inline-flex items-center justify-start  border border-white px-2 py-1 text-[13px] text-green-950 bg-green-100 rounded-md">
                <span>
                  <AiFillThunderbolt />
                </span>
                <p>Easy Apply</p>
              </button>
              <p>{job.active}</p>
            </div>
          </div>
        )}
      </div>

      {/* JobCard Modal  */}
      {isModalOpen && (
        <JobModal
          applyButton={applyButton}
          job={job}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
};

//   const matchScore = calculateMatchScore(userSkills, job.requiredSkills);

//   function calculateMatchScore(
//     userSkills: string[],
//     requiredSkills: string[]
//   ): number {
//     let matchedSkills = 0;

//     //looping through each skill required for the job
//     for (const skill of requiredSkills) {
//       //checking to see if the user has the required skill
//       if (userSkills.includes(skill)) {
//         matchedSkills++;
//       }
//     }

//     //calculating the percentage match
//     const matchPercentage = (matchedSkills / requiredSkills.length) * 100;
//     return Math.round(matchPercentage);
//   }
