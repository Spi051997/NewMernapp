import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";
import { IconButton } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "../config/ChatLogics";
import UpdateGroupModel from "./UpdateGroupModel";
import MyProfile from "./MyProfile";

const SingleChat = ({ fetchagain, setfetchagain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  console.log(selectedChat);
  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="work sans"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {/* <IconButton  d={{ base:"flex" , md:"none"}}
                        icon={<ArrowBackIcon/>} /> */}
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <MyProfile user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>{selectedChat.chatName.toUpperCase()}
              <UpdateGroupModel 
                fetchagain={fetchagain} 
                setfetchagain={setfetchagain}
                />
              
              </>
            )}
          </Text>

          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            pt="2"
            bg="#E8E8E8"
            w="100%"
            h="86% "
            borderRadius="lg"
            overflowY="hidden"
          >

          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb={3} fontFamily="work sans" color="gray.400">
            Click on user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
