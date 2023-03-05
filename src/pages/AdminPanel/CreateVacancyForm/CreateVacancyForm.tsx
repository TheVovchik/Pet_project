/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import {
  Button,
  Flex, FormLabel, IconButton, Input, Progress, Text,
} from '@chakra-ui/react';
import React, {
  FC, Fragment, useEffect, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import {
  collection, addDoc, getDocs, runTransaction, doc, deleteDoc,
} from 'firebase/firestore';
import { AppDispatch } from '../../../storage/store';
import * as vacancyActions from '../../../storage/features/vacancy';
import { useAppSelector } from '../../../storage/hooks';
import { colors } from '../../../style/colors';
import { dataBase, storage } from '../../../firebase/config';
import { ContentActions } from '../../../types/ContentActionsEnum';
import { Vacancy } from '../../../types/Vacancy';

type Props = {
  action: ContentActions;
};

type Vacation = {
  id: string,
  vacancy: Vacancy,
};

export const CreateVacancyForm: FC<Props> = ({ action }) => {
  const [vacancies, setVacancies] = useState<Vacation[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUpload, setIsUpload] = useState(false);
  const [dutie, setDutie] = useState('');
  const [demand, setDemand] = useState('');
  const {
    cover, title, schedule, contacts, coverUrl, duties, demands, id,
  } = useAppSelector(store => store.vacancy);
  const dispatch = useDispatch<AppDispatch>();
  const collectionRef = collection(dataBase, 'vacancy');
  const isUpdate = action === ContentActions.UPDATE_VACANCY;
  const isDelete = action === ContentActions.REMOVE_VACANCY;

  const clearFields = () => {
    dispatch(vacancyActions.actions.setTitle(''));
    dispatch(vacancyActions.actions.setCover(''));
    dispatch(vacancyActions.actions.setCoverUrl(''));
    dispatch(vacancyActions.actions.setDuties([]));
    dispatch(vacancyActions.actions.setDemands([]));
    dispatch(vacancyActions.actions.setSchedule(''));
    dispatch(vacancyActions.actions.setContacts(''));
    dispatch(vacancyActions.actions.setVacancyId(''));
  };

  const getData = async () => {
    await getDocs(collectionRef)
      .then((response) => {
        setVacancies(response.docs.map((item) => {
          const oneVacancy: Vacation = {
            id: item.id,
            vacancy: item.data() as Vacancy,
          };

          return oneVacancy;
        }));
      });
  };

  const handleCreateVacancy = async () => {
    await addDoc(collectionRef, {
      coverUrl,
      title,
      duties,
      demands,
      schedule,
      contacts,
    })
      .then(() => {
        alert('Data was added');
        clearFields();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleUpdateVacancy = async () => {
    const docRef = doc(dataBase, 'vacancy', id);

    try {
      await runTransaction(dataBase, async (transaction) => {
        transaction.update(docRef, {
          coverUrl,
          title,
          duties,
          demands,
          schedule,
          contacts,
        });
      });
      alert('Transaction successfully committed!');
    } catch (e) {
      alert('Transaction failed');
    }
  };

  const handleDeleteVacancy = async (vacancyId: string) => {
    await deleteDoc(doc(dataBase, 'vacancy', vacancyId));
    getData();
  };

  const handleVacancyUpdateSelect = (vacancie: Vacation) => {
    dispatch(vacancyActions.actions.setTitle(vacancie.vacancy.title));
    dispatch(vacancyActions.actions.setCoverUrl(vacancie.vacancy.coverUrl));
    dispatch(vacancyActions.actions.setDuties(vacancie.vacancy.duties));
    dispatch(vacancyActions.actions.setDemands(vacancie.vacancy.demands));
    dispatch(vacancyActions.actions.setSchedule(vacancie.vacancy.schedule));
    dispatch(vacancyActions.actions.setContacts(vacancie.vacancy.contacts));
    dispatch(vacancyActions.actions.setVacancyId(vacancie.id));
    setShowForm(true);
  };

  const handleSetVacancyCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      setCoverFile(file);

      if (!file.type.includes('image/')) {
        return;
      }

      const path = URL.createObjectURL(file);

      dispatch(vacancyActions.actions.setCover(path));
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
    if (coverFile) {
      setIsUpload(true);

      const storageRef = ref(storage, coverFile.name);
      const uploadTask = uploadBytesResumable(storageRef, coverFile);

      uploadTask.on('state_changed', (snapshot) => {
        // eslint-disable-next-line max-len
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setUploadProgress(progress);
      },
      (error) => {
        alert(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setIsUpload(false);
          dispatch(vacancyActions.actions.setCoverUrl(downloadURL));
          alert('photo successfully updated');
        });
      });
    }
  };

  useEffect(() => {
    clearFields();

    if (isUpdate || isDelete) {
      getData();
      setShowForm(false);
    } else {
      setVacancies([]);
      setShowForm(true);
    }
  }, [action]);

  return (
    <>
      {vacancies && vacancies.map((vacancie) => {
        return (
          <Fragment key={vacancie.id}>
            <Button
              type="button"
              color="white"
              mr="10px"
              bg={colors.main}
              _hover={{
                bg: isUpdate ? 'grey' : colors.main,
                color: isUpdate ? colors.main : 'white',
                cursor: isUpdate ? 'pointer' : 'initial',
              }}
              onClick={isUpdate
                ? () => handleVacancyUpdateSelect(vacancie)
                : () => {}}
            >
              {vacancie.vacancy.title}
            </Button>

            {isDelete && (
              <IconButton
                alignSelf="flex-end"
                mr="14px"
                color="white"
                bg="darkred"
                _hover={{
                  bg: 'red',
                }}
                aria-label="Call Segun"
                size="sm"
                onClick={() => handleDeleteVacancy(vacancie.id)}
                icon={<DeleteIcon />}
              />
            )}
          </Fragment>
        );
      })}

      {showForm && (
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

          {!isUpload && (
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
          )}
          {isUpload && <Progress hasStripe value={uploadProgress} />}

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

          <FormLabel htmlFor="title" mb="28px">
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

          <Button
            type="button"
            color="white"
            mr="10px"
            bg={colors.main}
            _hover={{
              bg: 'grey',
              color: colors.main,
            }}
            onClick={isUpdate ? handleUpdateVacancy : handleCreateVacancy}
          >
            {isUpdate ? 'Оновити вакансію' : 'Додати вакансію'}
          </Button>
        </Flex>
      )}
    </>

  );
};
