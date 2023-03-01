/* eslint-disable import/no-extraneous-dependencies */
import { Flex, Link, useMediaQuery } from '@chakra-ui/react';
import { faPhone } from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import { colors } from '../../../style/colors';
import './ContactPhones.scss';

export const ContactPhones: FC = () => {
  const [isLargerThan1200] = useMediaQuery('(min-width: 1200px)');

  return (
    <Flex
      direction="column"
      gap="8px"
      justify="center"
    >
      <Link
        href="tel:+380989066988"
        color={colors.main}
        _hover={{
          textDecoration: 'none',
        }}
        fontSize={isLargerThan1200 ? '20px' : '12px'}
        fontWeight="700"
      >
        <FontAwesomeIcon
          icon={faPhone as IconProp}
          style={{ marginRight: '8px' }}
        />
        098 906 69 88
      </Link>

      <Link
        href="tel:+380994276013"
        color={colors.main}
        _hover={{
          textDecoration: 'none',
        }}
        fontSize={isLargerThan1200 ? '20px' : '12px'}
        fontWeight="700"
      >
        <FontAwesomeIcon
          icon={faPhone as IconProp}
          style={{ marginRight: '8px' }}
        />
        099 427 60 13
      </Link>
    </Flex>
  );
};
