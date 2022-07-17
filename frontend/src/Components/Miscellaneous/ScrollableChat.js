import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import {
  Box,
  Text,
  Spinner,
  FormControl,
  Input,
  useToast,
  Tooltip,
  Avatar,
} from "@chakra-ui/react";
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from "../config/ChatLogics";
import { ChatState } from "../../Context/ChatProvider";
const ScrollableChat = ({ message }) => {
  const { user } = ChatState();
  return (
    <div>
      <ScrollableFeed>
        {message &&
          message.map((m, i) => (
            <div style={{ display: "flex" }} key={m._id}>
              {(isSameSender(message, m, i, user._id) ||
                isLastMessage(message, m, i, user._id)) && (
                <Tooltip
                  hasArrow
                  label={m.sender.name}
                  aria-label="A tooltip"
                  placement="bottom-start"
                >
                  <Avatar
                    size="sm"
                    mt="7px"
                    cursor="pointer"
                    name={m.sender.name}
                    //    src={m.sender.pic}
                  />
                  {/* <Text>{m.content}</Text> */}
                </Tooltip>
              )}

              <span 
              style={{
                 backgroundColor:`${m.sender._id===user._id?"#BEE3F8":"#B9F5D0"}` ,
                  borderRadius:"20px",
                  padding:"5px 15px",
                  maxWidth:"75%",
                  marginLeft:isSameSenderMargin(message, m, i, user._id),
                  marginTop:isSameUser(message, m, i, user._id)?3:10
              }}>{m.content}</span>
            </div>
          ))}
      </ScrollableFeed>
    </div>
  );
};

export default ScrollableChat;
