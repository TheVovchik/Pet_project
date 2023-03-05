/* eslint-disable @typescript-eslint/no-unused-vars */
import { Flex, Grid, Heading } from '@chakra-ui/react';
import React, { FC } from 'react';
import useWindowDimensions from '../../hooks/useDeviceWidthChecker';
import { colors } from '../../style/colors';
import { Vacancy } from '../../types/Vacancy';
import { VacancieContacts } from './VacancieContacts';
import { VacancieDemands } from './VacancieDemands';
import { VacancieDuties } from './VacancieDuties';
import { VacancieSchedule } from './VacancieSchedule';
import { VacancyImage } from './VacancyImage';

type Props = {
  vacancie: Vacancy;
};

export const Vacancie: FC<Props> = ({ vacancie }) => {
  const {
    coverUrl,
    title,
    duties,
    demands,
    schedule,
    contacts,
  } = vacancie;
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <Flex
      bg="white"
      border={`1px solid ${colors.main}`}
      borderRadius="30px"
      direction="column"
      align="center"
      maxW="1200px"
      p="20px"
      m="0 auto 40px"
    >
      <VacancyImage image={coverUrl} />

      <Heading
        fontFamily="inherit"
        color={colors.main}
        fontWeight="800"
        fontSize="24px"
        mb="20px"
      >
        {title}
      </Heading>

      <Grid
        templateColumns={isMobile ? '1fr' : '1fr 1fr'}
        width="100%"
        mb="20px"
      >
        <VacancieDuties duties={duties} />

        <VacancieDemands demands={demands} />
      </Grid>

      <VacancieSchedule schedule={schedule} />

      <VacancieContacts contacts={contacts} />
    </Flex>
  );
};
