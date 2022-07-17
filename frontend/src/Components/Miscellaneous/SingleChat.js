import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Spinner,
  FormControl,
  Input,
  useToast,
} from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";
import { IconButton } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "../config/ChatLogics";
import UpdateGroupModel from "./UpdateGroupModel";
import MyProfile from "./MyProfile";
import ScrollableChat from "./ScrollableChat";
import axios from "axios";
import './Css/Appp.css';
const SingleChat = ({ fetchagain, setfethagin }) => {
  const [message, setmessage] = useState([]);
  const [loading, setloading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const { user, selectedChat, setSelectedChat } = ChatState();

  const toast = useToast();

    const fetchmessages=async()=>{

      if(!selectedChat)
      return;

      try{
     
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
         
        setloading(true);
        const {data}=await axios.get(`api/message/${selectedChat._id}`,config)
        console.log(data); 
        setmessage(data); 
        setloading(false);

      }
      catch(error)
      {
        toast({
          title: "Error while sending a message",
          // description: "warning",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });

      }

    };

    useEffect(()=>{
      fetchmessages();
    },[selectedChat])

  const sendmessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
          
        setNewMessage("");  
        const { data } = await axios.post(
          `api/message`,
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );

        // console.log(data);
       
        setmessage([...message, data]);
      } catch (error) {
        toast({
          title: "Error while sending a message",
          // description: "warning",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };
  const typinghandlerr = (e) => {
    setNewMessage(e.target.value);
  };

  // console.log(selectedChat);
  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "23px", md: "25px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="work sans"
            display="flex"
            justifyContent="space-between"
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
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupModel
                  fetchagain={fetchagain}
                  setfethagin={setfethagin}
                  fetchmessages={fetchmessages}
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
            {/* {Messages Here} */}
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="message">

                <ScrollableChat message={message} />
              </div>
            )}
            <FormControl onKeyDown={sendmessage} isRequired mt={3}>
              <Input
                variant="filled"
                bg="E0E0E0"
                borderRadius="14px"
                placeholder="Enter the mesage"
                onChange={typinghandlerr}
                value={newMessage}
              />
            </FormControl>
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
