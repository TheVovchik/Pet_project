/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import {
  Flex, FormLabel, IconButton, Input, Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AddIcon } from '@chakra-ui/icons';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { AppDispatch } from '../../../storage/store';
import * as vacancyActions from '../../../storage/features/vacancy';
import { useAppSelector } from '../../../storage/hooks';
import { colors } from '../../../style/colors';
import { storage } from '../../../firebase/config';

export const CreateVacancyForm = () => {
  const [dutie, setDutie] = useState('');
  const [demand, setDemand] = useState('');
  const {
    cover, title, schedule, contacts,
  } = useAppSelector(store => store.vacancy);
  const dispatch = useDispatch<AppDispatch>();

  const handleSetVacancyCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      if (!file.type.includes('image/')) {
        return;
      }

      dispatch(vacancyActions.actions.setCover(file));
    }
  };

  const handleSetVacancyTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(vacancyActions.actions.setTitle(e.target.value));
  };

  const handleSetVacancySchedule = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(vacancyActions.actions.setSchedule(e.target.value));
  };

  const handleSetVacancyContacts = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(vacancyActions.actions.setContacts(e.target.value));
  };

  const addDutie = () => {
    if (dutie) {
      dispatch(vacancyActions.actions.addDutie(dutie));
      setDutie('');
    }
  };

  const addDemand = () => {
    if (demand) {
      dispatch(vacancyActions.actions.addDemand(demand));
      setDemand('');
    }
  };

  const uploadFoto = () => {
    if (cover) {
      const storageRef = ref(storage, cover.name);

      const uploadTask = uploadBytesResumable(storageRef, cover);

      uploadTask.on('state_changed', (snapshot) => {
        // eslint-disable-next-line max-len
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          dispatch(vacancyActions.actions.setCoverUrl(downloadURL));
        });
      });
    }
  };

  return (
    <Flex
      direction="column"
    >
      <FormLabel htmlFor="file-input">
        <Text>
          Add Cover
        </Text>

        <input
          type="file"
          id="file-input"
          accept="image/*"
          onChange={handleSetVacancyCover}
          defaultValue=""
        />
      </FormLabel>

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
        isDisabled={!cover}
        onClick={uploadFoto}
        icon={<AddIcon />}
      />

      <FormLabel htmlFor="title">
        <Text>
          Додати титул
        </Text>

        <Input
          type="text"
          id="title"
          onChange={handleSetVacancyTitle}
          value={title}
        />
      </FormLabel>

      <FormLabel htmlFor="title">
        <Text>
          Додати обов&apos;язок
        </Text>

        <Input
          type="text"
          id="title"
          onChange={(e) => setDutie(e.target.value)}
          value={dutie}
        />
      </FormLabel>

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
        isDisabled={dutie.length === 0}
        onClick={addDutie}
        icon={<AddIcon />}
      />

      <FormLabel htmlFor="title">
        <Text>
          Додати вимогу
        </Text>

        <Input
          type="text"
          id="title"
          onChange={(e) => setDemand(e.target.value)}
          value={demand}
        />
      </FormLabel>

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
        isDisabled={demand.length === 0}
        onClick={addDemand}
        icon={<AddIcon />}
      />

      <FormLabel htmlFor="title">
        <Text>
          Додати графік роботи
        </Text>

        <Input
          type="text"
          id="title"
          onChange={handleSetVacancySchedule}
          value={schedule}
        />
      </FormLabel>

      <FormLabel htmlFor="title">
        <Text>
          Додати контакти
        </Text>

        <Input
          type="text"
          id="title"
          onChange={handleSetVacancyContacts}
          value={contacts}
        />
      </FormLabel>
    </Flex>
  );
};
