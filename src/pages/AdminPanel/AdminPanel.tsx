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
import { CreatePostForm } from './CreatePostForm';
import { CreateVacancyForm } from './CreateVacancyForm';
import { PostPreview } from './PostPreview';
import { VacancyPreview } from './VacancyPreview';

export const AdminPanel = () => {
  const [
    contentAction,
    setContentAction,
  ] = useState<ContentActions | null>(null);
  const { uid, signedIn } = useAppSelector(store => store.admin);
  const navigate = useNavigate();
  const isVacancyPreview = contentAction === ContentActions.ADD_VACANCY
    || contentAction === ContentActions.UPDATE_VACANCY;
  const isPostPreview = contentAction === ContentActions.ADD_POST
    || contentAction === ContentActions.UPDATE_POST;
  const isVacancyAction = contentAction === ContentActions.ADD_VACANCY
    || contentAction === ContentActions.UPDATE_VACANCY
    || contentAction === ContentActions.REMOVE_VACANCY;
  const isPostAction = contentAction === ContentActions.ADD_POST
    || contentAction === ContentActions.UPDATE_POST
    || contentAction === ContentActions.REMOVE_POST;

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
      minH="100vh"
      templateColumns="1fr 1fr 3fr"
    >
      <Flex
        direction="column"
        h="100%"
        borderRight="2px solid gray"
        gap="10px"
        p="20px"
        minW="250px"
      >
        <Heading
          fontFamily="inherit"
          color={colors.main}
          fontWeight="800"
          fontSize="24px"
          mb="20px"
        >
          Виберіть дію з вакансіями
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
          mb="20px"
        >
          Редагувати вакансію
        </Button>

        <Heading
          fontFamily="inherit"
          color={colors.main}
          fontWeight="800"
          fontSize="24px"
          mb="20px"
        >
          Виберіть дію з статтями
        </Heading>

        <Button
          colorScheme="twitter"
          variant="outline"
          type="button"
          onClick={() => handleAction(ContentActions.ADD_POST)}
        >
          Додати статтю
        </Button>

        <Button
          colorScheme="twitter"
          variant="outline"
          type="button"
          onClick={() => handleAction(ContentActions.REMOVE_POST)}
        >
          Видалити статтю
        </Button>

        <Button
          colorScheme="twitter"
          variant="outline"
          type="button"
          onClick={() => handleAction(ContentActions.UPDATE_POST)}
        >
          Редагувати статтю
        </Button>
      </Flex>

      <Flex
        direction="column"
        h="100%"
        borderRight="2px solid gray"
        gap="10px"
        p="20px"
        minW="350px"
      >
        <Heading
          fontFamily="inherit"
          color={colors.main}
          fontWeight="800"
          fontSize="24px"
          mb="20px"
        >
          Панель керування
        </Heading>
        {isVacancyAction
          && (<CreateVacancyForm action={contentAction} />)}
        {isPostAction
          && (<CreatePostForm action={contentAction} />)}
      </Flex>

      <Flex
        direction="column"
        maxH="100vh"
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
          Попередній перегляд
        </Heading>

        {isVacancyPreview && <VacancyPreview />}
        {isPostPreview && <PostPreview />}
      </Flex>
    </Grid>
  );
};
