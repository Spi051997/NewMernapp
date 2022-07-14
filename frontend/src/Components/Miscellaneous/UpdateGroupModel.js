import React, { useState } from "react";
import UserBadgeItem from "./UserBadgeItem";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  IconButton,
  useToast  ,
  Box
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { ViewIcon } from "@chakra-ui/icons";
import { ChatState } from "../../Context/ChatProvider";

const UpdateGroupModel = ({ fetchagain, setfetchagain }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {selectedChat,
    setSelectedChat,
    user,
    setUser,
    notification,
    setNotification,
    chats,
    setChats,} =ChatState();

    const [groupChatName,setGroupChatName]=useState();
    const  [search,setseatch]=useState('');
    const [searchResult,setSearchResult]=useState();
    const [loading,setloading]=useState(false);
    const [renameloading, setrenameloadin]=useState(false);  

    const toast = useToast()

    const handeleremove=(deleuser)=>{
        // setSelectedChat(selectedChat.filter((sel) => sel._id !== deleuser._id));
    }

  return (
    <div>
      <IconButton d={{ base: "flex" }} icon={<ViewIcon />}  onClick={onOpen} />
      <Modal  isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />    
        <ModalContent>
          <ModalHeader fontSize="25px" fontFamily="Work sans" display='flex' justifyContent='center'>{selectedChat.chatName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w='100%' display='flex' flexWrap='wrap' pb={3} >
                {selectedChat.users.map(u=>(
                    <UserBadgeItem
                    key={u._id}
                    user={u}
                    handlefuntion={() => handeleremove(u)}
                  /> 
                ))   }
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UpdateGroupModel;
