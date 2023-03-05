import { MinusIcon } from '@chakra-ui/icons';
import {
  Heading, Flex, IconButton, Text, Box,
} from '@chakra-ui/react';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import { colors } from '../../../style/colors';

type Props = {
  demands: string[];
  removeDemand?: (demand: string) => void,
};

export const VacancieDemands: FC<Props> = ({ demands, removeDemand }) => {
  return (
    <Box width="100%">
      <Heading
        fontFamily="inherit"
        color={colors.main}
        fontWeight="600"
        fontSize="20px"
        mb="20px"
      >
        Вимоги
      </Heading>

      <Flex
        direction="column"
      >
        {demands && demands.map((demand) => {
          return (
            <Flex
              key={demand}
              align="center"
              mb="16px"
            >
              <FontAwesomeIcon
                icon={faCircleExclamation}
                style={{
                  marginRight: '12px',
                  fontSize: '16px',
                  color: 'red',
                }}
              />

              <Text
                fontSize="16px"
                fontWeight="500"
                color="black"
                mr="20px"
              >
                {demand}
              </Text>

              {removeDemand && (
                <IconButton
                  alignSelf="flex-end"
                  mr="14px"
                  color="white"
                  bg={colors.main}
                  _hover={{
                    bg: 'grey',
                    color: colors.main,
                  }}
                  aria-label="Call Segun"
                  size="sm"
                  onClick={() => removeDemand(demand)}
                  icon={<MinusIcon />}
                />
              )}
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
};
