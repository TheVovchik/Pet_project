/* eslint-disable import/no-extraneous-dependencies */
import { Flex, Link, useMediaQuery } from '@chakra-ui/react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faInstagram, faFacebook,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import {
  instagramRedirectLink, facebookRedirectLink,
} from '../../../constants/links';
import { colors } from '../../../style/colors';

export const SocialButtons = () => {
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

  return (
    <Flex
      justify="center"
      gap="16px"
    >
      <Flex
        bg="transparent"
        color={colors.main}
        opacity="0.7"
        borderRadius="8px"
        _hover={{
          opacity: 1,
          bg: 'rgba(84,115,158,.06)',
        }}
        align="center"
        justify="center"
        p="4px"
        fontSize={isLargerThan768 ? '48px' : '32px'}
        lineHeight={isLargerThan768 ? '48px' : '32px'}
      >
        <Link
          href={instagramRedirectLink}
          target="_blank"
        >
          <FontAwesomeIcon
            icon={faInstagram as IconProp}
          />
        </Link>
      </Flex>

      <Flex
        bg="transparent"
        color={colors.main}
        opacity="0.7"
        borderRadius="8px"
        _hover={{
          opacity: 1,
          bg: 'rgba(84,115,158,.06)',
        }}
        align="center"
        justify="center"
        p="4px"
        fontSize={isLargerThan768 ? '48px' : '32px'}
        lineHeight={isLargerThan768 ? '48px' : '32px'}
      >
        <Link
          href={facebookRedirectLink}
          target="_blank"
        >
          <FontAwesomeIcon
            icon={faFacebook as IconProp}
          />
        </Link>
      </Flex>

    </Flex>
  );
};
