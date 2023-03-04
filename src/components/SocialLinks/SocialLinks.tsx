/* eslint-disable import/no-extraneous-dependencies */
import {
  Flex, Text,
} from '@chakra-ui/react';
import { SocialButtons } from './SocialButtons';

export const SocialLinks = () => {
  return (
    <Flex
      align="center"
      display="column"
      textAlign="center"
      p="10px"
    >
      <Text
        mb="8px"
      >
        Підписуйтесь на нас в соціальних мережах
      </Text>

      <SocialButtons />
    </Flex>
  );
};
