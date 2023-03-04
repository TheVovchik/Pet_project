import {
  Box,
  Flex, Image,
} from '@chakra-ui/react';
import Pande from '../../IMAGES/footer/panda.png';
import { SocialLinks } from '../SocialLinks';
import bg from '../../IMAGES/footer/pows20.png';
import { PhoneContact } from '../PhoneContact';
import { AdressContact } from '../AdressContact';
import { ScheduleContact } from '../ScheduleContact';

export const FooterContactsMobile = () => {
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
        direction="column"
        pos="relative"
        p="10px"
        gap="10px"
      >
        <Image
          h="100%"
          pos="absolute"
          src={Pande}
          alt="Панда"
          top="0"
          right="0"
          opacity="0.6"
        />

        <PhoneContact fs_icon="32px" fs_link="16px" mr_icon="14px" />

        <AdressContact fs_icon="32px" fs_link="16px" mr_icon="14px" />

        <ScheduleContact fs_icon="40px" fs_text="20px" mr_icon="16px" />
      </Flex>

      <SocialLinks />
    </Box>
  );
};
