import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { useSession, signIn } from 'next-auth/react'
import { useGlitch } from 'react-powerglitch'
import useSWR from 'swr'
import Link from 'next/link'
import Image from 'next/image'

import GithubUser from '../../components/github-user'
import requestReposIssues from '../api/issues'

import { eventNames } from 'process'

const Owner = () => {
  const { data: session, status } = useSession()
  const [gitHubUser, setGitHubUser] = React.useState('')

  const glitchDev = useGlitch({
    playMode: 'always',
    createContainers: true,
    hideOverflow: false,
    timing: {
      duration: 2150,
      easing: 'ease-in',
    },
    glitchTimeSpan: {
      start: 0.5,
      end: 0.7,
    },
    shake: {
      velocity: 25,
      amplitudeX: 0.69,
      amplitudeY: 0.05,
    },
    slice: {
      count: 6,
      velocity: 15,
      minHeight: 0.02,
      maxHeight: 0.15,
      hueRotate: true,
    },
    pulse: false,
  })

  const glitchBountier = useGlitch({
    playMode: 'always',
    createContainers: true,
    hideOverflow: false,
    timing: {
      duration: 3550,
    },
    glitchTimeSpan: {
      start: 0.5,
      end: 0.7,
    },
    shake: {
      velocity: 25,
      amplitudeX: 0.69,
      amplitudeY: 0.05,
    },
    slice: {
      count: 6,
      velocity: 15,
      minHeight: 0.02,
      maxHeight: 0.15,
      hueRotate: true,
    },
    pulse: false,
  })

  const handleGitHubUserName = (value) => {
    setGitHubUser(value)
  }
  async function fetcher(url) {
    const res = await fetch(url)

    return res.json()
  }
  //api.github.com/repos/anandkgpt03/test/issues

  const { data } = useSWR(`/api/issues?owner=${gitHubUser}`, fetcher)
  console.log('gitHubUser', gitHubUser)
  return (
    <Flex flexDirection="column" bgColor="black">
      {status === 'authenticated' && <GithubUser handleGitHubUserName={handleGitHubUserName} />}
      <Flex height="100vh" flexDirection="column" justifyContent="space-evenly">
        <Flex justifyContent="center">
          <Image src="/pngegg (3).png" alt="" width={350} height={350} />
        </Flex>
        <Flex justifyContent="space-evenly">
          <Flex>
            <Link onClick={() => signIn()} href="/" ref={glitchDev.ref}>
              <Text color="red" fontSize={36} fontWeight="bold">
                DEVELOPER {gitHubUser}
              </Text>
            </Link>
          </Flex>
          <Flex>
            <Link onClick={() => signIn()} href="/" ref={glitchBountier.ref}>
              <Text color="blue" fontSize={36} fontWeight="semibold">
                BOUNTIER
              </Text>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Owner
