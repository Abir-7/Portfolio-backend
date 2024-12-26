/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGetAllBlog } from "@/hooks/blogs/blog.hook";
import { useGetAllProject } from "@/hooks/projects/project.hook";
import { useGetAllSkill } from "@/hooks/skills/skill.hook";
import { IApiResponse } from "@/interface/apiResponse.interface";
import React from "react";

const Dashboard = () => {
  const { data } = useGetAllBlog();
  const { data: skill } = useGetAllSkill();
  const { data: projects } = useGetAllProject();
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Skills */}
        <div className="border rounded-lg shadow-md hover:shadow-lg transition-shadow hover:translate-y-[-5px] duration-300 p-6">
          <h2 className="text-xl font-semibold">Total Skills</h2>
          <p className="text-3xl font-bold mt-2">
            {" "}
            {(skill as IApiResponse<any>)?.data?.length}
          </p>
        </div>

        {/* Total Blogs */}
        <div className="border rounded-lg shadow-md hover:shadow-lg transition-shadow hover:translate-y-[-5px] duration-300 p-6">
          <h2 className="text-xl font-semibold">Total Blogs</h2>
          <p className="text-3xl font-bold mt-2">
            {(data as IApiResponse<any>)?.data?.length}
          </p>
        </div>

        {/* Total Projects */}
        <div className="border rounded-lg shadow-md hover:shadow-lg  hover:translate-y-[-5px] transition-shadow duration-300 p-6">
          <h2 className="text-xl font-semibold">Total Projects</h2>
          <p className="text-3xl font-bold mt-2">
            {" "}
            {(projects as IApiResponse<any>)?.data?.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
