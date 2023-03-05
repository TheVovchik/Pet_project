import { MinusIcon } from '@chakra-ui/icons';
import {
  Heading, Flex, IconButton, Box, Text,
} from '@chakra-ui/react';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import { colors } from '../../../style/colors';

type Props = {
  duties: string[];
  removeDutie?: (dutie: string) => void,
};

export const VacancieDuties: FC<Props> = ({ duties, removeDutie }) => {
  return (
    <Box
      width="100%"
    >
      <Heading
        fontFamily="inherit"
        color={colors.main}
        fontWeight="600"
        fontSize="20px"
        mb="20px"
      >
        Обов&apos;язки
      </Heading>

      <Flex
        direction="column"
      >
        {duties && duties.map((dutie) => {
          return (
            <Flex
              key={dutie}
              align="center"
              mb="16px"
            >
              <FontAwesomeIcon
                icon={faClipboard}
                style={{
                  marginRight: '12px',
                  fontSize: '16px',
                  color: 'green',
                }}
              />

              <Text
                fontSize="16px"
                fontWeight="500"
                color="black"
                mr="20px"
              >
                {dutie}
              </Text>

              {removeDutie && (
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
                  onClick={() => removeDutie(dutie)}
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
