import { Tweet } from "@/gql/graphql";
import Link from "next/dist/client/link";
import React from "react";
import { FaRegHeart, FaRetweet } from "react-icons/fa6";
import { LuMessageCircle } from "react-icons/lu";
import { MdOutlineFileUpload } from "react-icons/md";

interface FeedCardProps {
  data: Tweet;
}
const FeedCard: React.FC<FeedCardProps> = (props) => {
  //FC is functional component
  const { data } = props;
  return (
    <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-1">
          {data.author?.profileImageURL && (
            <img
              className="rounded-full"
              src={data.author.profileImageURL}
              alt="user-image"
              height={50}
              width={50}
            />
          )}
        </div>
        <div className="col-span-11">
          <h5>
            <Link href={`/${data.author?.id}`}>
              {data.author?.firstName} {data.author?.lastName}
            </Link>
          </h5>

          <p>{data.content}</p>
          <div className="flex justify-between mt-5 text-xl items-center p-2 w-[90%]">
            <div>
              <LuMessageCircle />
            </div>
            <div>
              <FaRetweet />
            </div>
            <div>
              <FaRegHeart />
            </div>
            <div>
              <MdOutlineFileUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FeedCard;
