import { NextApiRequest, NextApiResponse } from 'next'
import { requestIssues } from '../../scripts/issues'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { owner, repo } = req.query
  const issues = await requestIssues(owner, repo)
  console.log('issues', issues)

  res.status(200).json({ issues })
}
