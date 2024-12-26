"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  useDeleteBlog,
  useEditBlog,
  useGetAllBlog,
} from "@/hooks/blogs/blog.hook";
import { IApiResponse } from "@/interface/apiResponse.interface";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import CForm from "@/components/ui_component/form/CForm";
import CButton from "@/components/ui_component/form/CButton";
import CTextEditor from "@/components/ui_component/form/CTextEditor";
import CInput from "@/components/ui_component/form/Cinput";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const ManageBlog = () => {
  const { data } = useGetAllBlog();
  const blogs = (data as IApiResponse<any>)?.data || [];
  const { mutate: deleteBlog } = useDeleteBlog();
  const { mutate: editBlog } = useEditBlog();

  const [selectedBlog, setSelectedBlog] = useState<any | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleDelete = () => {
    if (selectedBlog) {
      deleteBlog(selectedBlog._id, {
        onSuccess: () => {
          toast.success("Blog deleted successfully.");
          setSelectedBlog(null); // Close modal
        },
        onError: (err) => {
          console.error("Failed to delete blog:", err);
        },
      });
    }
  };

  const onFromSubmit = async (data: FieldValues) => {
    if (selectedBlog) {
      // Filter out fields with empty or undefined values
      const filteredData = Object.fromEntries(
        Object.entries(data).filter(
          ([, value]) => value !== undefined && value !== ""
        )
      );

      editBlog(
        { id: selectedBlog._id, data: filteredData },
        {
          onSuccess: () => {
            toast.success("Blog updated successfully.");
            setSelectedBlog(null); // Close modal
            setIsEditMode(false);
          },
          onError: (err) => {
            console.error("Failed to update blog:", err);
          },
        }
      );
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Manage Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog: any) => (
          <div
            key={blog._id}
            className="max-w-sm rounded overflow-hidden shadow-lg bg-white"
          >
            <Image
              width={100}
              height={100}
              className="w-full"
              src={blog.photo}
              alt={blog.name}
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{blog.name}</div>
              <div
                className="text-gray-700 text-base"
                dangerouslySetInnerHTML={{
                  __html:
                    blog.description.length > 30
                      ? `${blog.description.slice(0, 30)}...`
                      : blog.description,
                }}
              ></div>
            </div>
            <div className="px-6 py-4 flex justify-between">
              {/* Edit Button */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setSelectedBlog(blog);
                      setIsEditMode(true);
                    }}
                  >
                    Edit
                  </Button>
                </DialogTrigger>
                {isEditMode && selectedBlog && (
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Blog</DialogTitle>
                    </DialogHeader>
                    <CForm onFromSubmit={onFromSubmit}>
                      <div className="space-y-2">
                        <CInput
                          required={false}
                          label="Blog Title"
                          name="name"
                        ></CInput>

                        <CTextEditor
                          required={false}
                          name="description"
                          label="Description"
                        ></CTextEditor>
                        <CButton text="Update Blog" type="submit"></CButton>
                      </div>
                    </CForm>
                  </DialogContent>
                )}
              </Dialog>

              {/* Delete Button */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setSelectedBlog(blog)}
                  >
                    Delete
                  </Button>
                </DialogTrigger>
                {selectedBlog && (
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Blog</DialogTitle>
                    </DialogHeader>
                    <p>Are you sure you want to delete this blog?</p>
                    <div className="flex gap-4 mt-4">
                      <Button
                        variant="destructive"
                        onClick={handleDelete}
                        className="w-1/2"
                      >
                        Yes
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedBlog(null)}
                        className="w-1/2"
                      >
                        No
                      </Button>
                    </div>
                  </DialogContent>
                )}
              </Dialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageBlog;
