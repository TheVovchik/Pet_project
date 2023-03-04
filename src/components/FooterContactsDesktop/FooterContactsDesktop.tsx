import {
  Box,
  Flex, Image, useMediaQuery,
} from '@chakra-ui/react';
import Pande from '../../IMAGES/footer/panda.png';
import bg from '../../IMAGES/footer/pows20.png';
import { SocialLinks } from '../SocialLinks';
import { GoogleMap } from '../GoogleMap';
import { PhoneContact } from '../PhoneContact';
import { AdressContact } from '../AdressContact';
import { ScheduleContact } from '../ScheduleContact';

export const FooterContactsDesktop = () => {
  const [isLargerThan1200] = useMediaQuery('(min-width: 1200px)');

  return (
    <Box
      pos="relative"
    >
      <Image
        pos="absolute"
        src={bg}
        bottom="0"
        left="0"
        zIndex="-1"
      />
      <Flex
        pos="relative"
        p="20px"
        gap="20px"
        align="center"
      >
        <Image
          h={isLargerThan1200 ? '70%' : '60%'}
          pos="absolute"
          src={Pande}
          alt="Панда"
          top="50%"
          transform="translateY(-50%)"
          right="0"
          opacity="0.6"
          zIndex="2"
        />

        <Flex
          align="center"
          direction="column"
          gap="10px"
          minW="320px"
        >

          <PhoneContact fs_icon="40px" fs_link="20px" mr_icon="16px" />

          <AdressContact fs_icon="40px" fs_link="20px" mr_icon="16px" />

          <ScheduleContact fs_icon="40px" fs_text="20px" mr_icon="16px" />

        </Flex>

        <Box
          pr="200px"
          w="100%"
        >
          <GoogleMap height="400px" width="90%" />
        </Box>
      </Flex>

      <SocialLinks />
    </Box>
  );
};
