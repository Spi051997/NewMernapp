import React, { useEffect, useState } from "react";
import '../Miscellaneous/Css/Appp.css'
import { ChatState } from "../../Context/ChatProvider";
import { useToast, Box, Button,Stack ,Text} from "@chakra-ui/react";
import axios from "axios";
import { AddIcon } from "@chakra-ui/icons";
import {getSender}  from '../config/ChatLogics'
import ChatLoading from "./ChatLoading";
import GroupModel from "./GroupModel";
const MyChat = ({fetchagain   }) => {
  const [loggeduser, setloggeduser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const toast = useToast();


  const fetchChats = async () => {
    console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      console.log(data);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  useEffect(() => {
    setloggeduser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchagain]);
  return (
    <>
      <Box
        d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
        flexDir="column"
        alignItems="center"
        p={3}
        bg="white"
        w={{ base: "100%", md: "31%" }}
        borderRadius="lg"
        borderWidth="1px"
      >
        <Box
          pb={3}
          px={3}
          fontSize={{ base: "24px", md: "20px" }}
          fontFamily="Work sans"
          display="flex"
          w="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          MyChats
          <GroupModel>
          <Button
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
          </GroupModel>
        </Box>
        <Box
          display="flex"
          flexDir="column"
          p={3}
          bg="#F8F8F8"
          w="100%"
          // h="100%"
          borderRadius="lg"
        >
          {
            chats?(<>
            <Stack overflowY="scroll">
              {chats.map((chat)=>(
                 <Box onClick={() => setSelectedChat(chat)}
                 cursor="pointer"
                 bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                 color={selectedChat === chat ? "white" : "black"}
                 px={3}
                 py={2}
                 borderRadius="lg"
                 key={chat._id}>

                  <Text>
                  {!chat.isGroupChat
                    ? getSender(loggeduser, chat.users)
                    : chat.chatName}
                  </Text>

                 </Box>
              ))}
            </Stack>
            </>):(
              <ChatLoading />
            )
          }
        </Box>
      </Box>
    </>
  );
};

export default MyChat;
