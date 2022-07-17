const asynchandller = require("express-async-handler");
const Message = require("../model/messageMode");
const User = require("../model/userModel");
const Chat=require("../model/userModel")
const sendMessage = asynchandller(async (req, res) => {
  const { content, chatId } = req.body;
  // Check
  if (!content || !chatId) {
    console.log("Invallid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message,{
      path:'chat.users',
      select:'name pic email'
    });

    await Chat.findByIdAndUpdate(req.body.chatId,{
       latestMessage:message,
    })

    res.json(message)
  } catch (error) {
     res.status(400);
     throw new Error(error.message);
  }
});


const allMessage=asynchandller(async(req,res)=>{
try{ 
     
    // using params cause we geeting parameter
    const message=await Message.find({chat:req.params.chatId}).populate("sender","name pic email").populate("chat");

    res.json(message);

}    
catch(error)
{
    res.status(400);
    throw new Error(error.message);
}


});

module.exports = { sendMessage ,allMessage};
