/* eslint-disable import/no-extraneous-dependencies */
import {
  Flex, ListItem, UnorderedList, Image,
} from '@chakra-ui/react';
import { FC } from 'react';
import { NavigationLink } from '../NavigationLink';
import bg from '../../../IMAGES/main/pulse.png';

export const Navigation: FC = () => {
  return (
    <Flex
      pos="relative"
      align="center"
      justify="center"
      h="100%"
    >
      <Image
        pos="absolute"
        top="0"
        left="0"
        opacity="0.1"
        zIndex="-2"
        w="100%"
        src={bg}
        alt="пульс"
      />
      <UnorderedList
        display="flex"
        gap="12px"
      >
        <ListItem>
          <NavigationLink
            name="Головна"
            path="/"
          />
        </ListItem>

        <ListItem>
          <NavigationLink
            name="Послуги"
            path="/services"
          />
        </ListItem>

        <ListItem>
          <NavigationLink
            name="Команда"
            path="/team"
          />
        </ListItem>

        <ListItem>
          <NavigationLink
            name="Вакансії"
            path="/vacancies"
          />
        </ListItem>

        <ListItem>
          <NavigationLink
            name="Блог"
            path="/blog"
          />
        </ListItem>

        <ListItem>
          <NavigationLink
            name="Контакти"
            path="/contacts"
          />
        </ListItem>
      </UnorderedList>
    </Flex>
  );
};
