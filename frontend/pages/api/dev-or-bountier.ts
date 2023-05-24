import { requestReposIssues } from '../../scripts/issues'

export default async function handler(req, res) {
  const { owner } = req.query
  const repos = await requestReposIssues(owner)
  const reposWithIssues = repos.filter((repoWithIssues) => repoWithIssues.has_issues)
  res.status(200).json({ reposWithIssues })
}
