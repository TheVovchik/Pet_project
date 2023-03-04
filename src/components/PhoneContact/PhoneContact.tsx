import { Flex, Link } from '@chakra-ui/react';
import { faPhone } from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import { colors } from '../../style/colors';

type Props = {
  fs_link: string,
  mr_icon: string,
  fs_icon: string,
};

export const PhoneContact: FC<Props> = ({
  fs_icon, fs_link, mr_icon,
}) => {
  return (
    <Flex
      align="center"
    >
      <FontAwesomeIcon
        icon={faPhone as IconProp}
        style={{
          marginRight: mr_icon,
          fontSize: fs_icon,
          color: colors.main,
        }}
      />

      <Flex
        direction="column"
      >
        <Link
          href="tel:+380989066988"
          color={colors.main}
          _hover={{
            textDecoration: 'none',
          }}
          fontSize={fs_link}
          fontWeight="700"
        >
          098 906 69 88
        </Link>

        <Link
          href="tel:+380994276013"
          color={colors.main}
          _hover={{
            textDecoration: 'none',
          }}
          fontSize={fs_link}
          fontWeight="700"
        >
          099 427 60 13
        </Link>
      </Flex>
    </Flex>
  );
};
