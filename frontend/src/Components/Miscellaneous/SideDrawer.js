import React, { useState } from "react";
import { Search2Icon, BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatState } from "../../Context/ChatProvider";
import MyProfile from "./MyProfile";
import {
  Text,
  Box,
  Tooltip,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Avatar,
} from "@chakra-ui/react";
const SideDrawer = () => {
  const { user } = ChatState();

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setloadingChat] = useState();
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
          <Button variant="ghost" display="flex" justifyContent="space-around">
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
            <MyProfile>
                My Profile
            </MyProfile>
              </MenuItem>
              <MenuItem>Log MenuOptionGroup</MenuItem>
            </MenuList>
            {/* <MenuItem>Create a Copy</MenuItem>
    <MenuItem>Mark as Draft</MenuItem> */}
          </Menu>
        </div>
      </Box>
    </div>
  );
};

export default SideDrawer;
