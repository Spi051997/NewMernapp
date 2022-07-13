import React, { useState } from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
  FormControl,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import UserList from "./UserList";
const GroupModel = ({ children }) => {
  const [groupChatName, setgroupchatName] = useState();
  const [selectedUsers, setselectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchresult, setsearchresult] = useState([]);
  const [loading, setloading] = useState(false);

  const { user, chats, setChats } = ChatState();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const handlesearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setloading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);
      console.log(data);
      setloading(false);
      setsearchresult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  const handlesubmit = () => {};
  const handeGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      return;
    }
     setselectedUsers([...selectedUsers,userToAdd])
  };
  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="19px"
            fontFamily="Work sans"
            dispaly="flex"
            alignSelf="center"
          >
            Create Gruop Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Input
                placeholder="Chat Name"
                mb="3"
                onChange={(e) => setgroupchatName(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <Input
                placeholder="Search Name"
                mb="1"
                onChange={(e) => handlesearch(e.target.value)}
              />
            </FormControl>
            {/* {selectedUsers.map((user)=>(

            ))} */}
            {loading ? (
              <Spinner />
            ) : (
              searchresult
                ?.slice(0, 4)
                .map((user) => (
                  <UserList
                    key={user._id}
                    user={user}
                    handleFunction={() => handeGroup(user)}
                  />
                ))
            )}
            {/* render searched user */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handlesubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupModel;
