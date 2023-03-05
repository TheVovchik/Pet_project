import { Flex, Heading, Text } from '@chakra-ui/react';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import { colors } from '../../../style/colors';

type Props = {
  schedule: string,
};

export const VacancieSchedule: FC<Props> = ({ schedule }) => {
  return (
    <Flex
      alignSelf="flex-start"
      direction="column"
      mb="20px"
    >
      <Heading
        fontFamily="inherit"
        color={colors.main}
        fontWeight="600"
        fontSize="20px"
        mb="4px"
      >
        <FontAwesomeIcon
          icon={faClock}
          style={{
            marginRight: '12px',
          }}
        />
        Графік роботи
      </Heading>

      <Text
        fontSize="16px"
        fontWeight="500"
        color="black"
        mr="20px"
      >
        {schedule || 'додайте графік роботи'}
      </Text>
    </Flex>
  );
};
