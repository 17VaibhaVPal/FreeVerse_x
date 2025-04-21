import React from "react"
import { FaRegHeart, FaRetweet } from "react-icons/fa6";
import { LuMessageCircle } from "react-icons/lu";
import { MdOutlineFileUpload } from "react-icons/md";

const FeedCard: React.FC = () => {//FC is functional component
    return(
         <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer">
        <div className="grid grid-cols-12 gap-3">
            <div className="col-span-1">
            <img src="https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-PNG-Free-File-Download.png" alt="user-image" height={50} width={50} />
            </div>
            <div className="col-span-11">
                <h5>Vaibhav Pal</h5>
                
                <p>
                  Life is a journey of constant learning, and for me, coding has become one of its most exciting parts. The logic, creativity, and problem-solving involved in writing code make it both challenging and deeply rewarding. 
                </p>
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
