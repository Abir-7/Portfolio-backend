/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  useDeleteProject,
  useGetAllProject,
} from "@/hooks/projects/project.hook";
import { IApiResponse } from "@/interface/apiResponse.interface";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ManageProject = () => {
  const { data, error } = useGetAllProject();
  console.log(error);
  const projects = (data as IApiResponse<any>)?.data || [];
  const { mutate } = useDeleteProject();
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const handleDelete = () => {
    if (selectedProject) {
      mutate(selectedProject._id, {
        onSuccess: () => {
          toast.success("Project deleted successfully.");
          setSelectedProject(null); // Close modal
        },
        onError: (err) => {
          console.error("Failed to delete project:", err);
        },
      });
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {projects && (
        <>
          {projects.map((project: any) => (
            <div
              key={project._id}
              className="border rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              {/* Project Image */}
              <Image
                src={project.photo[0] || ""}
                alt={project.name}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />

              {/* Project Info */}
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>

                {/* Features */}
                <h4 className="text-lg font-semibold mb-2">Features:</h4>
                <ul className="list-disc list-inside text-gray-700 mb-4">
                  {project.features.map((feature: string, index: number) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>

                {/* Technologies */}
                <h4 className="text-lg font-semibold mb-2">Technologies:</h4>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {project.technologies.map((tech: any) => (
                    <Image
                      key={tech._id}
                      src={tech.icon}
                      alt={tech.name}
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  ))}
                </div>

                {/* Links */}
                <h4 className="text-lg font-semibold mb-2">Links:</h4>
                <div className="flex flex-col gap-2">
                  <a
                    href={project.client}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Client Code
                  </a>
                  <a
                    href={project.server}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Server Code
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Live Site
                  </a>
                </div>
              </div>

              {/* Delete Button */}
              <div className="p-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setSelectedProject(project)}
                    >
                      Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Project</DialogTitle>
                    </DialogHeader>
                    <p>Are you sure you want to delete this project?</p>

                    <div className="flex gap-4 mt-4">
                      <DialogClose onClick={handleDelete} className="w-full">
                        <Button variant="destructive" className="w-1/2">
                          Yes
                        </Button>
                      </DialogClose>{" "}
                      <DialogClose className="w-full">
                        <Button
                          variant="outline"
                          onClick={() => setSelectedProject(null)}
                          className="w-1/2"
                        >
                          No
                        </Button>{" "}
                      </DialogClose>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ManageProject;
