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
  useToast,
  Box,
  FormControl,
  Input,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { ViewIcon } from "@chakra-ui/icons";
import { ChatState } from "../../Context/ChatProvider";
import axios from 'axios'
const UpdateGroupModel = ({ fetchagain, setfethagin}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    selectedChat,
    setSelectedChat,
    user,
    setUser,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const [groupChatName, setGroupChatName] = useState();
  const [search, setseatch] = useState("");
  const [searchResult, setSearchResult] = useState();
  const [loading, setloading] = useState(false);
  const [renameloading, setrenameloading] = useState(false);

  const toast = useToast();

  const handeleremove = (deleuser) => {
    // setSelectedChat(selectedChat.filter((sel) => sel._id !== deleuser._id));
  };

  const handleRename = async () => {
    if (!groupChatName) return;

    try {
        setrenameloading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      console.log(data._id);
      // setSelectedChat("");
      setSelectedChat(data);
      setfethagin(!fetchagain);
      setrenameloading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setrenameloading(false);
    }
    setGroupChatName("");
  };
  const handlesearch = () => {};

  return (
    <div>
      <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="25px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            {selectedChat.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w="100%" display="flex" flexWrap="wrap" pb={3}>
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handlefuntion={() => handeleremove(u)}
                />
              ))}
            </Box>
            <FormControl display="flex">
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />

              <Button
                variant="solid"
                ml={1}
                isLoading={renameloading}
                onClick={handleRename}
                colorScheme="teal"
              >
                Update
              </Button>
            </FormControl>
            <FormControl display="flex" flexDirection="column">
              {/* <Input
                placeholder="Add user......"
                mb={3}
                value={groupChatName}
                onChange={(e) => handlesearch(e.target.value)}
              /> */}
              
            </FormControl>
          </ModalBody>

          <ModalFooter>
          <Button
                justifyContent="center"
                colorScheme="red"
                mr={3}
                onClick={handeleremove(user)}
              >
                Leave Group
              </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UpdateGroupModel;
