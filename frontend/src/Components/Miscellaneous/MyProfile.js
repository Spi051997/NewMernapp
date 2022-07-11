import React from 'react';
import {useDisclosure} from '@chakra-ui/hooks';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    IconButton
    ,Button
  } from '@chakra-ui/react';
  
  import { ViewIcon } from "@chakra-ui/icons";


const MyProfile = ({user,children}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
   <>
   {children?(<span onClick={onOpen}>{children}</span>):(
    <IconButton
    
    aria-label='Search database'
    icon={<ViewIcon />
}
onClick={onOpen}


  />

   )}


<Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          hello
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
   </>
  )
}

export default MyProfile