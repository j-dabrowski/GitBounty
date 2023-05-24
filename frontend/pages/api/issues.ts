import { requestIssues } from '../../scripts/issues'

export default async function handler(req, res) {
  const { owner, repo } = req.query
  const repos = await requestIssues(owner, repo)
  //   const reposWithIssues = repos.filter((repoWithIssues) => repoWithIssues.has_issues)
  res.status(200).json({ repos })
}
