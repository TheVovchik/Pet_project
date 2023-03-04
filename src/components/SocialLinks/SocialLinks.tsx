/* eslint-disable import/no-extraneous-dependencies */
import {
  Flex, Link, Text, useMediaQuery,
} from '@chakra-ui/react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  facebookRedirectLink,
  instagramRedirectLink,
} from '../../constants/links';
import { colors } from '../../style/colors';

export const SocialLinks = () => {
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

  return (
    <Flex
      align="center"
      display="column"
      textAlign="center"
      p="10px"
    >
      <Text
        mb="8px"
      >
        Підписуйтесь на нас в соціальних мережах
      </Text>

      <Flex
        justify="center"
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
    </Flex>
  );
};
