/* eslint-disable import/no-extraneous-dependencies */
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Image,
  useDisclosure,
} from '@chakra-ui/react';
import { FC } from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { ContactPhones } from '../HeaderDesktop/ContactPhones';
import Logo from '../../IMAGES/main/logo.png';
import { colors } from '../../style/colors';
import { NavigationLink } from '../HeaderDesktop/NavigationLink';

export const HeaderMobile: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/home');
  };

  return (
    <Flex
      h="100px"
      justify="space-between"
      align="center"
      p="10px"
    >
      <Box
        cursor="pointer"
        h="100%"
        onClick={handleNavigateHome}
      >
        <Image
          src={Logo}
          alt="Ветеринарна клініка Панда"
          h="100%"
          w="auto"
        />
      </Box>

      <ContactPhones />

      <IconButton
        variant="outline"
        color={colors.main}
        fontSize="20px"
        borderWidth="3px"
        borderColor={colors.main}
        _hover={{
          bg: colors.main,
          color: 'white',
        }}
        onClick={onOpen}
        aria-label="Send email"
        icon={<HamburgerIcon />}
      />

      <Drawer size="xs" placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Меню</DrawerHeader>
          <DrawerBody
            display="flex"
            flexDirection="column"
            gap="10px"
          >
            <NavigationLink
              name="Головна"
              path="/"
            />

            <NavigationLink
              name="Послуги"
              path="/services"
            />

            <NavigationLink
              name="Команда"
              path="/team"
            />

            <NavigationLink
              name="Вакансії"
              path="/vacancies"
            />

            <NavigationLink
              name="Блог"
              path="/blog"
            />

            <NavigationLink
              name="Контакти"
              path="/contacts"
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};
