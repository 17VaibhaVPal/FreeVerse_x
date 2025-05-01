import FeedCard from "@/components/FeedCard";
import { useRouter } from "next/router";
import Twitterlayout from "@/components/FeedCard/layout/TwitterLayout";
import { Tweet, User } from "@/gql/graphql";

import { GetServerSideProps, NextPage } from "next";
import { FaArrowLeft } from "react-icons/fa6";
import { getGraphqlClient } from "@/clients/api";
import { getUserByIdQuery } from "@/graphql/query/user";

interface ServerProps {
  user?: User;
}
const UserProfilePage: NextPage<ServerProps> = (props) => {
  
  const router = useRouter();

  return (
    <div>
      <Twitterlayout>
        <div>
          <nav className=" flex items-center gap-3 py-3 px-3">
            <FaArrowLeft className="text-2xl" />
            <div>
              <h1 className="text-2xl font-bold">Vaibhav Pal</h1>
              <h1 className="text-md font-bold text-slate-500"> {props.user?.tweets?.length} Tweets</h1>
            </div>
          </nav>
          <div className="p-4 border-b border-slate-800">
            {props.user?.profileImageURL && (
              <img
                src={props.user?.profileImageURL}
                className="rounded-full"
                alt="user-image"
                width={100}
                height={100}
              />
            )}
            <h1 className="text-2xl font-bold mt-3">Vaibhav Pal</h1>
          </div>
          <div>
            {props.user?.tweets?.map((tweet) => (
              <FeedCard data={tweet as unknown as Tweet} key={tweet?.id} />
            ))}
          </div>
        </div>
      </Twitterlayout>
    </div>
  );
};

//to make profile page of user server side rended i.e. where u fetch the data tto seerver and display direct data to user
//" we did the client -side rendering "
export const getServerSideProps: GetServerSideProps<ServerProps> = async (
  context
) => {
  const id = context.query.id as string | undefined;
  if (!id) return { notFound: true };

  const graphqlClient = getGraphqlClient();

  const userInfo = await graphqlClient.request(getUserByIdQuery, { id });

  if (!userInfo?.getUserById) return { notFound: true };

  return {
    props: {
      user: userInfo.getUserById as User,
    },
  };
};
export default UserProfilePage;
