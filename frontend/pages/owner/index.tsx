import React from 'react'
import { Flex, Center, Text, Button } from '@chakra-ui/react'
import { signIn } from 'next-auth/react'

const Owner = () => {
  return (
    <React.Fragment>
      <Flex direction="column" align="center">
        <Text>Choose how you want to proceed</Text>
        <Flex mt="5">
          <Center>
            <Button
              onClick={() => signIn()}
              bgColor="orange"
              borderRadius="10"
              p="3"
              _hover={{ textDecoration: 'none' }}
            >
              As a Dev
            </Button>
          </Center>
          <Center ml="5">
            <Button
              onClick={() => signIn()}
              bgColor="lightgreen"
              p="3"
              borderRadius="10"
              _hover={{ textDecoration: 'none' }}
            >
              As a Bounty giver
            </Button>
          </Center>
        </Flex>
      </Flex>
    </React.Fragment>
  )
}

export default Owner
