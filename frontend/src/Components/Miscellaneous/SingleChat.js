import React from "react";
import { Box,Text } from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";

const SingleChat = ({ fetchagain, setfetchagain }) => {
  const { user ,selectedChat, setSelectedChat,} = ChatState();
  console.log(selectedChat)
  return <>
  {
    selectedChat?(<>
                   <Text
                     fontSize={{base:"28px" ,md:"30px"}}
                     pb={3}
                     px={2}
                     w="100%"
                     fontFamily="work sans"
                     display='flex'
                     justifyContent="center"
                     alignItems="center">
                    </Text>    
    
    </>):(
            <Box display='flex' alignItems='center' justifyContent='center' h='100%'>
              <Text fontSize='3xl' pb={3} fontFamily='work sans' color='gray.400' >
                Click on user to start chatting 
              </Text>
            </Box>
    )
  }
  </>;
};

export default SingleChat;
