import React,{useEffect,useState} from 'react'
import { Box} from '@chakra-ui/react'
import { ChatState } from '../Context/ChatProvider'
import SideDrawer from '../Components/Miscellaneous/SideDrawer'
import MyChat from '../Components/Miscellaneous/MyChat'
import ChatBox from '../Components/Miscellaneous/ChatBox'
const ChatPage =() => {
   const {user}=ChatState();
   const [fetchagain, setfethagin]=useState(false);
  return (
    <div style={{width:'100%'}}>
        {
            user && < SideDrawer/>
        }
        <Box display='flex'
           w='100%'
           h='91.5vh'
           p='5'
           justifyContent='space-between'>
            {user && <MyChat  fetchagain={fetchagain}/>}
            { user && <ChatBox fetchagain={fetchagain} setfethagin={setfethagin} />}

        </Box>
    </div>
  )
}

export default ChatPage