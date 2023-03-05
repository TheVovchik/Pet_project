import {
  Flex, Grid, Heading,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../storage/hooks';
import { colors } from '../../../style/colors';
import * as vacancyActions from '../../../storage/features/vacancy';
import { AppDispatch } from '../../../storage/store';
import { VacancyImage } from '../../../components/Vacancie/VacancyImage';
import { VacancieDuties } from '../../../components/Vacancie/VacancieDuties';
import { VacancieDemands } from '../../../components/Vacancie/VacancieDemands';
import {
  VacancieSchedule,
} from '../../../components/Vacancie/VacancieSchedule';
import {
  VacancieContacts,
} from '../../../components/Vacancie/VacancieContacts';

export const VacancyPreview = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    cover, title, duties, demands, schedule, contacts, coverUrl,
  } = useAppSelector(store => store.vacancy);

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
      <VacancyImage image={coverUrl || cover} />

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
        mb="20px"
      >
        <VacancieDuties duties={duties} removeDutie={removeDutie} />

        <VacancieDemands demands={demands} removeDemand={removeDemand} />
      </Grid>

      <VacancieSchedule schedule={schedule} />

      <VacancieContacts contacts={contacts} />
    </Flex>
  );
};
