import {
  Box, Flex, Heading, Image,
} from '@chakra-ui/react';
import { FC } from 'react';
import Pande from '../../IMAGES/footer/panda.png';
import bg from '../../IMAGES/footer/pows20.png';
import { colors } from '../../style/colors';
import { AdressContact } from '../AdressContact';
import { GoogleMap } from '../GoogleMap';
import { PhoneContact } from '../PhoneContact';
import { ScheduleContact } from '../ScheduleContact';
import { SocialButtons } from '../SocialLinks/SocialButtons';

export const ContactsMobile: FC = () => {
  return (
    <Flex
      w="100%"
      direction="column"
      gap="20px"
    >

      <Flex
        direction="column"
        pos="relative"
        p="30px 30px 0"
        gap="10px"
        width="100%"
      >
        <Image
          pos="absolute"
          src={bg}
          top="0"
          left="0"
          zIndex="-1"
        />
        <Image
          maxH="260px"
          h="100%"
          pos="absolute"
          src={Pande}
          alt="Панда"
          top="50%"
          transform="translateY(-50%)"
          right="-40px"
          opacity="0.6"
        />

        <Heading
          fontFamily="inherit"
          color={colors.main}
          fontWeight="800"
          fontSize="40px"
        >
          Контакти
        </Heading>

        <PhoneContact fs_icon="32px" fs_link="16px" mr_icon="14px" />

        <AdressContact fs_icon="32px" fs_link="16px" mr_icon="14px" />

        <ScheduleContact fs_icon="40px" fs_text="20px" mr_icon="16px" />

        <Box w="fit-content">
          <SocialButtons />
        </Box>
      </Flex>

      <Box
        p="0 20px"
        w="100%"
        h="400px"
      >
        <GoogleMap width="100%" height="400px" />
      </Box>

      <Heading
        fontFamily="inherit"
        color={colors.main}
        fontWeight="800"
        fontSize="40px"
        textAlign="center"
      >
        Чекаємо Вас
        <br />
        у ветеринарній клініці Панда
      </Heading>
    </Flex>
  );
};
