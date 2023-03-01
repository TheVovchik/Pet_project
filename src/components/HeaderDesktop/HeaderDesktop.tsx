/* eslint-disable import/no-extraneous-dependencies */
import {
  Box, Flex, Image, useMediaQuery,
} from '@chakra-ui/react';
import { FC } from 'react';
import Logo from '../../IMAGES/main/logo.png';
import { Navigation } from './Navigation';
import { ContactPhones } from './ContactPhones';

export const HeaderDesktop: FC = () => {
  const [isLargerThan1200] = useMediaQuery('(min-width: 1200px)');

  return (
    <Flex
      h={isLargerThan1200 ? '140px' : '100px'}
      justify="space-between"
      p="10px"
    >
      <Box
        h="100%"
      >
        <Image
          src={Logo}
          alt="Ветеринарна клініка Панда"
          h="100%"
          w="auto"
        />
      </Box>

      <nav className="nav">
        <Navigation />
      </nav>

      <ContactPhones />
    </Flex>
  );
};
