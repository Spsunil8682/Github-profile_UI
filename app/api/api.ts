// Define GitHubUser type
export type GitHubUser = {
    // username:string,
    login: string;
    name: string;
    bio: string | null;
    followers: number;
    following: number;
    avatar_url: string;
    public_repos: number;
    html_url: string;
  };
  
  // Fetch GitHub user data
  export async function getGitHubUser(username: string): Promise<GitHubUser> {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error("User not found");
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching GitHub user data:", error);
      throw error; // Rethrow the error for the calling function to handle
    }
  }
  