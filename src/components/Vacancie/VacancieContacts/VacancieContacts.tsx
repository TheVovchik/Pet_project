import { Flex, Heading, Text } from '@chakra-ui/react';
import { faAddressBook } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import { colors } from '../../../style/colors';

type Props = {
  contacts: string;
};

export const VacancieContacts: FC<Props> = ({ contacts }) => {
  return (
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
  );
};
