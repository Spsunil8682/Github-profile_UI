"use client";

import React, { useState } from "react";
import Image from "next/image";

const GitHubProfile = () => {
  const [username, setUsername] = useState(""); 
  const [userData, setUserData] = useState<any>(null); 
  const [error, setError] = useState<string | null>(null); 

  const predefinedUsers = ["Spsunil8682", "mahendra2811", "siddhantdixit", "ishikkkkaaaa", "Anup451"]; 
  const fetchGitHubUser = async (selectedUsername: string = username) => {
    setError(null);
    setUserData(null);
    if (!selectedUsername) {
      setError("Please enter or select a username.");
      return;
    }
    try {
      const response = await fetch(`https://api.github.com/users/${selectedUsername}`);
      if (!response.ok) {
        throw new Error("User not found");
      }
      const data = await response.json();
      setUserData(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-3xl font-bold text-center mb-4">GitHub Profile Viewer</h1>
      <div className="flex flex-col items-center gap-4 mb-8">
        {/* <div className="w-full flex items-center gap-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                fetchGitHubUser();
              }
            }}
            className="border border-gray-300 rounded-lg p-2 w-2/3"
            placeholder="Enter GitHub username"
          />
          <button
            onClick={() => fetchGitHubUser()}
            className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
          >
            Search
          </button>
        </div> */}
        <div className="w-full">
          <select
            className="border border-gray-300 rounded-lg p-2 w-full"
            defaultValue=""
            onChange={(e) => {
              const selectedUser = e.target.value;
              if (selectedUser) {
                setUsername(selectedUser);
                fetchGitHubUser(selectedUser);
              }
            }}
          >
            <option value="" disabled>
              Select a username
            </option>
            {predefinedUsers.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {userData && (
        <div className="text-center">
          <Image
            src={userData.avatar_url}
            alt={`${userData.name || userData.login}'s avatar`}
            className="w-32 h-32 rounded-full mx-auto"
            width={100}
            height={100}
          />
          <h1 className="text-2xl font-bold mt-4">
            {userData.name || userData.login}
          </h1>
          <p className="text-gray-600">{userData.bio || "No bio available"}</p>
          <div className="mt-4">
            <p>
              Followers: <span className="font-semibold">{userData.followers}</span>
            </p>
            <p>
              Following: <span className="font-semibold">{userData.following}</span>
            </p>
            <p>
              Repos: <span className="font-semibold">{userData.public_repos}</span>
            </p>
          </div>
          <div className="mt-4">
            <a
              href={userData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gray-800 text-white px-4 py-2 rounded-md mt-2 hover:bg-gray-900"
            >
              View GitHub Profile
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default GitHubProfile;
