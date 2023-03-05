/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button, Flex, Grid, Heading,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogginStatus from '../../firebase/LogginStatus';
import Vacancy from '../../storage/features/vacancy';
import { useAppSelector } from '../../storage/hooks';
import { colors } from '../../style/colors';
import { ContentActions } from '../../types/ContentActionsEnum';
import { CreateVacancyForm } from './CreateVacancyForm';
import { VacancyPreview } from './VacancyPreview';

export const AdminPanel = () => {
  const [
    contentAction,
    setContentAction,
  ] = useState<ContentActions | null>(null);
  const { uid, signedIn } = useAppSelector(store => store.admin);
  const navigate = useNavigate();

  const handleCheckUserLoggin = async () => {
    await LogginStatus(uid);

    if (!signedIn) {
      navigate('/auth');
    }
  };

  const handleAction = (action: ContentActions) => {
    setContentAction(action);
  };

  useEffect(() => {
    handleCheckUserLoggin();
  }, []);

  return (
    <Grid
      templateColumns="1fr 1fr 3fr"
    >
      <Flex
        direction="column"
        h="100vh"
        borderRight="2px solid gray"
        gap="10px"
        p="20px"
      >
        <Heading
          fontFamily="inherit"
          color={colors.main}
          fontWeight="800"
          fontSize="24px"
          mb="20px"
        >
          Виберіть дію
        </Heading>

        <Button
          colorScheme="teal"
          variant="outline"
          type="button"
          onClick={() => handleAction(ContentActions.ADD_VACANCY)}
        >
          Додати вакансію
        </Button>

        <Button
          colorScheme="teal"
          variant="outline"
          type="button"
          onClick={() => handleAction(ContentActions.REMOVE_VACANCY)}
        >
          Видалити вакансію
        </Button>

        <Button
          colorScheme="teal"
          variant="outline"
          type="button"
          onClick={() => handleAction(ContentActions.UPDATE_VACANCY)}
        >
          Редагувати вакансію
        </Button>
      </Flex>

      <Flex
        direction="column"
        h="100vh"
        borderRight="2px solid gray"
        gap="10px"
        p="20px"
      >
        <CreateVacancyForm />
      </Flex>

      <Flex
        direction="column"
        h="100vh"
        borderRight="2px solid gray"
        gap="10px"
        p="20px"
      >
        <VacancyPreview />
      </Flex>
    </Grid>
  );
};
