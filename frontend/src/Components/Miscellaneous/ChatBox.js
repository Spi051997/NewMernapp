import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import { Box } from '@chakra-ui/react';
import SingleChat from './SingleChat';

const ChatBox = ({fetchagain, setfethagin}) => {

  const { selectedChat}=ChatState();
  // const [fetchagain, setfetchagain]=useState(false);
  return (
    <Box d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
    alignItems="center"
    flexDir="column"
    p={3}
    bg="white"
    w={{ base: "100%", md: "68%" }}
    borderRadius="lg"
    borderWidth="1px">
     <SingleChat  fetchagain={fetchagain} setfethagin={setfethagin}/>
    </Box>
  )
}

export default ChatBox