import { Flex, Text } from '@chakra-ui/react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCalendarWeek } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import { colors } from '../../style/colors';

type Props = {
  fs_text: string,
  mr_icon: string,
  fs_icon: string,
};

export const ScheduleContact: FC<Props> = ({
  fs_icon, fs_text, mr_icon,
}) => {
  return (
    <Flex
      align="center"
    >
      <FontAwesomeIcon
        icon={faCalendarWeek as IconProp}
        style={{
          marginRight: mr_icon,
          fontSize: fs_icon,
          color: colors.main,
        }}
      />

      <Flex
        direction="column"
      >
        <Text
          color={colors.main}
          fontSize={fs_text}
          fontWeight="700"
        >
          08:00 - 19:00
          <br />
          без вихідних
        </Text>
      </Flex>
    </Flex>
  );
};
