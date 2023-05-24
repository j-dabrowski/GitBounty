const requestReposIssues = async (owner) => {
  const request = await fetch(`https://api.github.com/users/${owner}/repos`, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `token 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`,
    },
  })

  const response = await request.json()

  return response
}

const requestIssues = (owner, repo) => {
  fetch(`https://api.github.com/repos/${owner}/${repo}/issues`, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `token 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`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
    })
}

export { requestReposIssues, requestIssues }
// import Octokit from '@octokit/rest'

// export default async function issues(req, res) {
//   const { owner } = req.query
//   console.log('owner', owner)
//   const octokit = new Octokit({
//     auth: process.env.GITHUB_TOKEN,
//   })

//   try {
//     const result = await octokit.request('GET /users/{owner}/repos', {
//       owner: owner,
//     })
//     const namesRepos = await result.data.map((repo) => ({
//       name: repo.name,
//     }))

//     const issuesPromises = namesRepos.map(async (repo) => {
//       const resultIssues = await octokit.request('GET /repos/{owner}/{repo}/issues', {
//         owner: owner,
//         repo: repo.name,
//       })

//       const issuesWithDetails = await resultIssues.data.map((issue) => ({
//         title: issue.title,
//         name: issue.user.login,
//         authorID: issue.user.id,
//         issueId: issue.id,
//         issueUrl: issue.url,
//       }))

//       if (issuesWithDetails.length > 0) {
//         return {
//           issuesWithDetails,
//         }
//       }
//     })

//     const filteredIssues = (await Promise.all(issuesPromises)).filter(Boolean)

//     return res.status(200).json({ filteredIssues })
//   } catch (error) {
//     console.log(`Error! Status: ${error.status}`)
//   }
// }

// // export default issues

// // const octokit = new Octokit({
// //   auth: 'YOUR-TOKEN',
// // })

// // await octokit.request('GET /repos/{owner}/{repo}/issues', {
// //   owner: 'OWNER',
// //   repo: 'REPO',
// //   headers: {
// //     'X-GitHub-Api-Version': '2022-11-28',
// //   },
// // })

// // const token = process.env.GITHUB_TOKEN

// // const requestReposIssues = async (name) => {
// //   await fetch(`https://api.github.com/repos/chusynuk/issues`, {
// //     headers: {
// //       Accept: 'application/vnd.github+json',
// //       Authorization: `token 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`,
// //     },
// //   })
// //     .then((response) => response.json())
// //     .then((data) => {
// //       console.log(data)
// //     })
// // }

// // export default requestReposIssues
