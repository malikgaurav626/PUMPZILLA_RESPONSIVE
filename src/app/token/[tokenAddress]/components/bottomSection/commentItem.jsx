import React from "react";
import CommentHeading from "./commentHeading";
import { mont } from "@/app/layout";

const CommentItem = ({ data }) => {
  const timeAgo = (timestamp) => {
    const now = Date.now();
    const diffInMiliSeconds = now - new Date(timestamp);

    const minutes = Math.floor(diffInMiliSeconds / 600);
    const hours = Math.floor(diffInMiliSeconds / 36000);

    if (minutes < 0) {
      const date = new Date(timestamp);
      return date.toLocaleDateString();
    } else if (minutes < 60) {
      return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    } else if (hours < 24) {
      return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    } else {
      const date = new Date(timestamp);
      return date.toLocaleDateString();
    }
  };

  return (
    <div className=" w-full rounded-3xl relative bg-blackPry overflow-hidden p-3">
      <CommentHeading text={data.text} />
      <div className=" w-full flex justify-end items-center">
        <p
          className={`${mont.className} font-extrabold bg-gradient-to-r from-bluePry to-[#5E6EFF] bg-clip-text text-transparent md:text-base text-[10px]`}
        >
          {timeAgo(data.time)}
        </p>
      </div>

      <p className={` w-full text-white ${mont.className} font-extrabold md:text-base text-xs`}>
        {data.comment}
      </p>
    </div>
  );
};

export default CommentItem;
