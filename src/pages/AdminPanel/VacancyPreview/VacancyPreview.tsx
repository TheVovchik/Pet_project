/* eslint-disable no-console */
import {
  Box, Flex, Grid, Heading, IconButton, Image, Text,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClipboard,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import {
  faClock, faAddressBook,
} from '@fortawesome/free-regular-svg-icons';
import React, { useMemo } from 'react';
import { MinusIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import Default from '../../../IMAGES/admin/default.png';
import { useAppSelector } from '../../../storage/hooks';
import { colors } from '../../../style/colors';
import * as vacancyActions from '../../../storage/features/vacancy';
import { AppDispatch } from '../../../storage/store';

export const VacancyPreview = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    cover, title, duties, demands, schedule, contacts, coverUrl,
  } = useAppSelector(store => store.vacancy);
  const imageURL = useMemo(() => (
    cover ? URL.createObjectURL(cover) : null
  ), [cover]);

  const removeDutie = (dutie: string) => {
    dispatch(vacancyActions.actions.removeDutie(dutie));
  };

  const removeDemand = (demand: string) => {
    dispatch(vacancyActions.actions.removeDemand(demand));
  };

  return (
    <Flex
      direction="column"
      align="center"
    >
      <Box
        width="400px"
        height="400px"
        mb="20px"
      >
        <Image
          src={imageURL || coverUrl || Default}
          alt="default"
          width="400px"
          height="400px"
          objectFit="cover"
          objectPosition="center"
        />
      </Box>

      <Heading
        fontFamily="inherit"
        color={colors.main}
        fontWeight="800"
        fontSize="24px"
        mb="20px"
      >
        {title || 'Назва вакансії'}
      </Heading>

      <Grid
        templateColumns="1fr 1fr"
        width="100%"
      >
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
                </Flex>
              );
            })}
          </Flex>
        </Box>

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
                </Flex>
              );
            })}
          </Flex>
        </Box>
      </Grid>

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

      <Flex
        alignSelf="flex-start"
        direction="column"
      >
        <Heading
          fontFamily="inherit"
          color={colors.main}
          fontWeight="600"
          fontSize="20px"
          mb="4px"
        >
          <FontAwesomeIcon
            icon={faAddressBook}
            style={{
              marginRight: '12px',
            }}
          />
          Контакти
        </Heading>

        <Text
          fontSize="16px"
          fontWeight="500"
          color="black"
          mr="20px"
        >
          {contacts || 'додайте контакти'}
        </Text>
      </Flex>
    </Flex>
  );
};
