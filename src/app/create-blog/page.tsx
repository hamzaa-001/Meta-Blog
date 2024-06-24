"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useUser } from "@clerk/nextjs";
import { UploadDropzone } from "@/utils/uploadthing";
import { useRouter } from "next/router"; // Import useRouter from next/router

//@ts-ignore
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const CreateBlog = () => {
  const [todayDate, setTodayDate] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [mainImgUrl, setMainImgUrl] = useState("");
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const { user } = useUser();
  const router = useRouter(); // Use useRouter hook to access query parameters

  console.log("userID:", user?.id);

  useEffect(() => {
    function getFormattedDate() {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const date = new Date();
      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();

      const latestDate = `${month} ${day} ${year}`;

      setTodayDate(latestDate);
    }

    getFormattedDate();
  }, []);

  useEffect(() => {
    if (router.query.id) {
      // Populate the form fields with the data from the query parameters
      setTitle(router.query.title as string);
      setContent(router.query.content as string);
      setCategory(router.query.category as string);
      setTodayDate(router.query.created_at as string);
      // If you have other fields to pre-fill, set them here
    }
  }, [router.query]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const postData = {
      blog_imgPath: mainImgUrl,
      blog_title: title,
      author: user?.fullName,
      blog_content: content,
      created_at: todayDate,
      category: category,
      author_avatar: user?.imageUrl,
      userID: user?.id,
    };

    try {
      let response;
      if (router.query.id) {
        // Edit existing blog
        response = await axios.put(
          `/api/blogs/${router.query.id}`,
          postData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        // Create new blog
        response = await axios.post("/api/blogs", postData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      console.log("Blog post created/edited:", response.data);

      setTitle("");
      setImage(null);
      setContent("");
      setCategory("");
    } catch (error) {
      console.error("Error creating/editing blog post:", error);
    }
    setShowSuccessMsg(true);
  };

  return (
    <div className="dark:bg-[#0A0A0A] dark:text-white">
      <div className="w-full max-w-4xl mx-auto py-12 px-4 md:px-6">
        <div className="mb-8 text-left">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            What&apos;s on your mind?
          </h1>
        </div>
        {showSuccessMsg ? (
          <div className="py-20">
            <div className="bg-green-200 px-6 py-4 my-4 rounded-md text-lg flex items-center mx-auto max-w-lg">
              <svg
                viewBox="0 0 24 24"
                className="text-green-600 w-5 h-5 sm:w-5 sm:h-5 mr-3"
              >
                <path
                  fill="currentColor"
                  d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                ></path>
              </svg>
              <span className="text-green-800">
                Your Blog has been {router.query.id ? "edited" : "posted"}
              </span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full grid  gap-8 ">
            <div className="grid gap-2">
              <Label htmlFor="title">Page Title</Label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a title"
                className="bg-[#f3f4f6] dark:bg-[#262626]  border dark:border-gray-700 border-gray-300"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Main Image</Label>
              <div
                className="bg-[#f3f4f6] dark:bg-[#262626] flex justify-start px-5 py-5 rounded-md cursor-pointer
           border dark:border-gray-700 border-gray-300"
              >
                <UploadDropzone
                  className="w-full"
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    //@ts-ignore
                    setMainImgUrl(res[0].url);
                    console.log("Files: ", res);
                  }}
                  onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                  }}
                />
              </div>
            </div>

            <div className="grid gap-2 quill-container">
              <Label htmlFor="content">Content</Label>
              <ReactQuill
                //@ts-ignore
                value={content}
                onChange={setContent}
                className="bg-[#f3f4f6] dark:bg-[#262626] rounded-lg outline-none  border dark:border-gray-700 border-gray-300"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter a category"
                className="bg-[#f3f4f6] dark:bg-[#262626] border dark:border-gray-700 border-gray-300"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="created_at">Created on</Label>
              <Input
                id="created_at"
                type="text"
                value={todayDate}
                disabled
                className="bg-[#f3f4f6] dark:bg-[#262626]  border dark:border-gray-700 border-gray-300"
              />
            </div>
            <Button type="submit" className="w-full md:w-auto">
              {router.query.id ? "Edit Post" : "Publish Post"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateBlog;
