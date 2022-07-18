import React, { useState } from "react";
import axios from "axios";
import { Search2Icon, BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatState } from "../../Context/ChatProvider";
import UserList from "./UserList";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  useToast,
  Spinner
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import MyProfile from "./MyProfile";
import ChatLoading from "./ChatLoading";
import {
  Text,
  Box,
  Tooltip,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  
  Avatar,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const SideDrawer = () => {
  

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const { user, setSelectedChat ,chats,
    setChats} = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const navigate = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const toast = useToast();
  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
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

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        p="5px 10px 5px 10px"
        bg="white"
        borderWidth="2px"
      >
        <Tooltip hasArrow label="Search User" aria-label="A tooltip">
          <Button
            ref={btnRef}
            variant="ghost"
            display="flex"
            justifyContent="space-around"
            onClick={onOpen}
          >
            <Search2Icon />
            <Text d={{ base: "none ", md: "flex" }} px="4">
              Search user
            </Text>
          </Button>
        </Tooltip>
        {/* Font Change */}
        <Text fontSize="2xl" fontFamily="Work sans">
          Talk-Back
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon />
            </MenuButton>
            <MenuList>
              {/* <MenuItem>Download</MenuItem>
    <MenuItem>Create a Copy</MenuItem>
    <MenuItem>Mark as Draft</MenuItem>
    <MenuItem>Delete</MenuItem>
    <MenuItem>Attend a Workshop</MenuItem> */}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton p={1} as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar name={user.name} size="sm" cursor="pointer" />
            </MenuButton>
            <MenuList>
              <MenuItem>
                <MyProfile user={user}>My Profile</MyProfile>
              </MenuItem>
              <MenuItem onClick={handlelogout}>Log out</MenuItem>
            </MenuList>
            {/* <MenuItem>Create a Copy</MenuItem>
    <MenuItem>Mark as Draft</MenuItem> */}
          </Menu>
        </div>
      </Box>

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search user</DrawerHeader>

          <DrawerBody>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              pb={2}
            >
              <Input
                placeholder="Search"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ?(
              <ChatLoading/>
            ):(
              searchResult?.map(user=>(
                <UserList  key={user._id} user={user}
                handleFunction={() => accessChat(user._id)} />
               ))
              
            )}

           {loadingChat && <Spinner ml="auto" d="flex" />} 
          </DrawerBody>

          <DrawerFooter>
            {/* <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default SideDrawer;
