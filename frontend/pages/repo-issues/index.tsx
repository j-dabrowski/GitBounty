import React from 'react'
import { Flex, Card, CardHeader, CardBody, CardFooter, Text, Heading } from '@chakra-ui/react'
import GithubUser from '../../components/github-user'

const RepoIssues = () => {
  const [openModal, setOpenModal] = React.useState(true)
  const [issues, setReposWithIssues] = React.useState([])
  const [githubUserRepos, setGithubUserRepos] = React.useState()

  const handleGitHubUserName = async (value) => {
    // const requestResponse = await requestReposIssues(value)
    // setGithubUserRepos(requestResponse)
    // setGitHubUser(value)

    const response = await fetch(`/api/dev-or-bountier?owner=${value}`)
    const { reposWithIssues } = await response.json()

    setReposWithIssues(reposWithIssues)
    setGithubUserRepos(value)
    setOpenModal(false)
  }

  const handleGithubIssues = async (repoName) => {
    const response = await fetch(`/api/issues?owner=${githubUserRepos}&repo=${repoName}`)
    const data = await response.json()

    console.log('data', data)
  }

  return (
    <Flex flex={1} justifyContent="center" bg="dimgrey" pt={6}>
      <Flex flexDirection="column" alignItems="center">
        <Heading>Repos with issues</Heading>
        <Flex>{openModal && <GithubUser handleGitHubUserName={handleGitHubUserName} />}</Flex>
        <Flex flexDirection="column" width="50vw">
          {issues?.map((repo, index) => {
            return (
              <Card
                key={index}
                mb={4}
                _hover={{ cursor: 'pointer' }}
                onClick={() => handleGithubIssues(repo.name)}
              >
                <CardBody>
                  <Text>Repo name: {repo.name}</Text>
                  <Text>Repo language: {repo.language}</Text>
                  <Text>Allow forking? {Boolean(repo.allow_forking)}</Text>
                </CardBody>
              </Card>
            )
          })}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default RepoIssues
