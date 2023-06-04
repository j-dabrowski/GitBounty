const { Octokit } = require("@octokit/rest");

export default async function (req, res) {
  const { owner } = req.query;
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  try {
    const result = await octokit.request("GET /users/{owner}/repos", {
      owner: owner,
    });
    const namesRepos = await result.data.map((repo) => ({
      name: repo.name,
    }));

    const issuesPromises = namesRepos.map(async (repo) => {
      const resultIssues = await octokit.request(
        "GET /repos/{owner}/{repo}/issues",
        {
          owner: owner,
          repo: repo.name,
        }
      );

      const issuesWithDetails = await resultIssues.data.map((issue) => ({
        title: issue.title,
        name: issue.user.login,
        authorID: issue.user.id,
        issueId: issue.id,
        issueUrl: issue.html_url,
        avatar: issue.user.avatar_url,
        repo: repo.name,
        description: issue.body.toLocaleLowerCase(),
      }));

      if (issuesWithDetails.length > 0) {
        return {
          issuesWithDetails,
        };
      }
    });

    const filteredIssues = (await Promise.all(issuesPromises)).filter(Boolean);

    return res.status(200).json({ filteredIssues });
  } catch (error) {
    console.log(`Error! Status: ${error.status}`);
  }
}
