/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { getGitHubUser } from "@/app/api/api";
import Image from "next/image";

export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const user = await params;

  if (!user?.username) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Error</h1>
        <p className="text-red-500">Username is missing in the route params</p>
      </div>
    );
  }

  const userData = await getGitHubUser(user.username).catch(() => null);

  if (!userData) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-2xl font-bold">Error</h1>
        <p className="text-red-500">
          Could not fetch data for user: {user.username}
        </p>
      </div>
    );
  }

  const { avatar_url, name, bio, followers, following, public_repos } =
    userData;

  return (
    <div className="max-w-xl mx-auto text-center">
      <Image
        src={avatar_url}
        alt={`${name}'s avatar`}
        className="w-32 h-32 rounded-full mx-auto"
        width={100}
        height={100}
      />
      <h1 className="text-2xl font-bold mt-4">{name}</h1>
      <p className="text-gray-600">{bio || "No bio available"}</p>
      <div className="mt-4 flex justify-around">
        <p>
          Followers: <span className="font-semibold">{followers}</span>
        </p>
        <p>
          Following: <span className="font-semibold">{following}</span>
        </p>
        <p>
          Repo: <span className="font-semibold">{public_repos}</span>
        </p>
      </div>
    </div>
  );
}
