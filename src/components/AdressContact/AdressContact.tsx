import { Flex, Link } from '@chakra-ui/react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import { googleMapRedirectUrl } from '../../constants/links';
import { colors } from '../../style/colors';

type Props = {
  fs_link: string,
  mr_icon: string,
  fs_icon: string,
};

export const AdressContact: FC<Props> = ({
  fs_icon, fs_link, mr_icon,
}) => {
  return (
    <Flex
      align="center"
    >
      <FontAwesomeIcon
        icon={faLocationDot as IconProp}
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
          href={googleMapRedirectUrl}
          color={colors.main}
          target="blanc"
          _hover={{
            textDecoration: 'none',
          }}
          fontSize={fs_link}
          fontWeight="700"
        >
          пр-т Б. Хмельницького, 139
          <br />
          Дніпро, Україна, 49000
        </Link>
      </Flex>
    </Flex>
  );
};
