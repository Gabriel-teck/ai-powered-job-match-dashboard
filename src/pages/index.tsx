import React, { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { MdLocationOn } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { useFilter } from "@/components/FilterContext";
import { useUser } from "@/components/UserContext";
import { JobList } from "@/components/JobList";
import { IoCloseSharp } from "react-icons/io5";


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
  active:string;
  rating:string;
}

const Index: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 
  const [searchLoading, setSearchLoading] = useState<boolean>(false); 
  const { skills } = useUser();
  const {
    searchJobTitle,
    setSearchJobTitle,
    searchLocation,
    setSearchLocation,
  } = useFilter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      try {
        const response = await fetch(
          "https://67be21d3321b883e790f31d8.mockapi.io/jobs"
        );
        const data = await response.json();
        setJobs(data);
        setFilteredJobs(data);
      } catch (error) {
        console.error(`Failed to get API data ${error}`);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchLoading(true);

    setTimeout(() => {
      const filtered = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchJobTitle.toLowerCase()) &&
          job.location.toLowerCase().includes(searchLocation.toLowerCase())
      );
      setFilteredJobs(filtered);
      setSearchLoading(false); 
    }, 1000);
  };

  const clearSearchTitleInput = () => {
    setSearchJobTitle(''); 
    setFilteredJobs(jobs); 
  };

  const clearSearchLocationInput = () => {
    setSearchLocation('');
    setFilteredJobs(jobs);
  };
 
  return (
    <Layout>
      {/* Search Form */}
      <section className="sm:max-w-2xl md:max-w-4xl mx-auto mt-12">
        <form
          className=" rounded-lg overflow-hidden md:flex md:flex-row shadow-md"
          onSubmit={handleSearch}
        >
          {/* Job Search input */}
          <div className="flex items-center gap-2 border-b border-gray-300 px-4 py-4 w-full md:w-auto flex-1">
            <FaSearch className="text-black font-bold text-lg" />
            <input
              type="text"
              placeholder="Job title"
              className="w-full outline-none text-gray-700 placeholder-gray-500 bg-transparent"
              value={searchJobTitle}
              onChange={(e) => setSearchJobTitle(e.target.value)}
            />
            {searchJobTitle && (
              <IoCloseSharp
                className="text-gray-500 text-2xl cursor-pointer"
                onClick={clearSearchTitleInput}
              />
            )}
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px bg-gray-300 h-12"></div>

          {/* Location input */}
          <div className="flex items-center gap-2 px-4 py-4 w-full md:w-auto flex-1">
            <MdLocationOn className="text-black font-bold text-2xl" />
            <input
              type="text"
              placeholder="Location"
              className="w-full outline-none text-gray-700 placeholder-gray-500 bg-transparent"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />
            {searchLocation && (
              <IoCloseSharp
                className="text-gray-500 text-2xl cursor-pointer"
                onClick={clearSearchLocationInput}
              />
            )}
          </div>

          {/* Desktop Search Button */}
          <button
            type="submit"
            className={`hidden md:block bg-blue-700 text-white font-semibold py-3 px-4 hover:bg-blue-800 transition ${
              searchLoading && "opacity-50 cursor-not-allowed"
            }`}
            disabled={searchLoading}
          >
            {searchLoading ? "Searching..." : "Find Jobs"}
          </button>
        </form>

        {/* Mobile Search Button */}
        <button
          type="submit"
          onClick={handleSearch}
          className={`md:hidden w-full mt-2 bg-blue-700 text-white font-semibold py-3 rounded-lg hover:bg-blue-800 transition ${
            searchLoading && "opacity-50 cursor-not-allowed"
          }`}
          disabled={searchLoading}
        >
          {searchLoading ? "Searching..." : "Find Jobs"}
        </button>
      </section>

      {/* Section Heading */}
      <h2 className="mt-8 text-center pt-12 w-full text-black text-2xl">
        Recommended Jobs
      </h2>

      {/* Job Listing Section */}
      <section>
        <div className="container mx-auto grid grid-rows-4 md:grid-cols-2 gap-5 mt-12">
          {loading ? (
            <div className="flex justify-center items-center col-span-2">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobList
                key={job.id}
                job={job}
                userSkills={skills}
                showProgressBar={true}
              />
            ))
          ) : (
            <p className="text-center text-gray-600 w-full col-span-2 text-lg font-semibold mt-10">
              No jobs found from your search.
            </p>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Index;
