import React from 'react';
import { Box } from '@chakra-ui/react';
import {CloseIcon} from '@chakra-ui/icons'

const UserBadgeItem = ({user,handlefuntion}) => {
  return (
    <Box  
    //    display='flex'
    //    flexDirection="column"
    px={2} py={0.5}
      color="white"
       borderRadius='lg'
       m={1}
       mb={2}
       variant='solid'
       fontSize={12}
       colorScheme='purple'
       background="purple.600"
       cursor='pointer'
       onClick={handlefuntion}>
        {user.name}
        <CloseIcon pl={1} />

    </Box>
  )
}

export default UserBadgeItem