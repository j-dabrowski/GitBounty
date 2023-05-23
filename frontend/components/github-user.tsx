import { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  useDisclosure,
} from '@chakra-ui/react'

function GithubUser({ handleGitHubUserName }) {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true })
  const [userName, setUserName] = useState('')

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Github username</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input onChange={(e) => setUserName(e.target.value)} />
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                handleGitHubUserName(userName)
                onClose()
              }}
              colorScheme="blue"
              mr={3}
            >
              Save
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default GithubUser
