import {
  Box, Flex, Grid, Heading, Image, useMediaQuery,
} from '@chakra-ui/react';
import bg from '../../IMAGES/footer/pows20.png';
import photo from '../../IMAGES/contacts/bg-foto.jpg';
import bg_svg from '../../IMAGES/contacts/bg.svg';
import pets from '../../IMAGES/contacts/pets.png';
import abstr from '../../IMAGES/contacts/bg-svg.png';
import { colors } from '../../style/colors';
import { AdressContact } from '../AdressContact';
import { PhoneContact } from '../PhoneContact';
import { ScheduleContact } from '../ScheduleContact';
import { SocialButtons } from '../SocialLinks/SocialButtons';
import { GoogleMap } from '../GoogleMap';

export const ContactsDesktop = () => {
  const [isLargerThan1200] = useMediaQuery('(min-width: 1200px)');

  return (
    <Grid
      flex="1"
      minH="100%"
      templateColumns="2fr 3fr"
    >
      <Flex
        direction="column"
        pos="relative"
        p="50px 62px 0"
        gap="20px"
        width="100%"
      >
        <Image
          pos="absolute"
          src={bg}
          top="0"
          minW="150%"
          left="0"
          zIndex="-1"
        />

        <Heading
          fontFamily="inherit"
          color={colors.main}
          fontWeight="800"
          fontSize="52px"
        >
          Контакти
        </Heading>

        <PhoneContact
          fs_icon={isLargerThan1200 ? '48px' : '32px'}
          fs_link={isLargerThan1200 ? '24px' : '16px'}
          mr_icon="18px"
        />

        <AdressContact
          fs_icon={isLargerThan1200 ? '48px' : '32px'}
          fs_link={isLargerThan1200 ? '24px' : '16px'}
          mr_icon="18px"
        />

        <ScheduleContact
          fs_icon={isLargerThan1200 ? '48px' : '32px'}
          fs_text={isLargerThan1200 ? '24px' : '16px'}
          mr_icon="18px"
        />

        <Box w="fit-content">
          <SocialButtons />
        </Box>
      </Flex>

      <Box
        pos="relative"
      >
        <Image
          src={photo}
          alt="Ветеринарна клініка Панда"
          pos="absolute"
          h="100%"
          w="100%"
          zIndex="-4"
          objectFit="cover"
          objectPosition="center right"
        />

        <Image
          src={bg_svg}
          alt="background"
          pos="absolute"
          minH="100%"
          w="25%"
          zIndex="-3"
          objectFit="cover"
          objectPosition="right center"
        />
        <Box
          h={isLargerThan1200 ? '450px' : '400px'}
          w={isLargerThan1200 ? '500px' : '400px'}
          pos="absolute"
          top="50%"
          transform="translateY(-50%)"
        >
          <GoogleMap
            width="90%"
            height={isLargerThan1200 ? '410px' : '360px'}
          />
        </Box>
      </Box>

      <Flex
        pos="absolute"
        align="center"
        justify="center"
        bottom="0"
        w="250px"
        h="250px"
        left="40%"
        transform="translateX(-50%)"
      >
        <Image
          src={abstr}
          alt="abstract"
          w="250px"
          zIndex="-2"
          mb="-60px"
        />

        <Image
          pos="absolute"
          src={pets}
          alt="тварини собаки коти"
          objectFit="contain"
          objectPosition="center center"
          left="20px"
          top="90px"
          w="60%"
          h="auto"
        />
      </Flex>
    </Grid>
  );
};
