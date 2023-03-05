/* eslint-disable no-console */
import {
  Box, Button, Flex, FormLabel, Heading, Input, Text,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogginStatus from '../../firebase/LogginStatus';
import signIn from '../../firebase/signIn';
import { useAppSelector } from '../../storage/hooks';
import { colors } from '../../style/colors';
import { setInLocalStorage } from '../../utils/localStorage';

export const SignIn = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { uid, signedIn } = useAppSelector(store => store.admin);
  const navigate = useNavigate();

  const handleForm = async (event: React.FormEvent) => {
    event.preventDefault();

    const { result, error } = await signIn(email, password);

    if (error) {
      return;
    }

    if (result) {
      setInLocalStorage('uid', result.user.uid);
      setInLocalStorage('signedIn', true);
    }

    navigate('/admin');
  };

  const handleCheckUserLoggin = async () => {
    await LogginStatus(uid);

    if (signedIn) {
      navigate('/admin');
    }
  };

  useEffect(() => {
    if (uid) {
      handleCheckUserLoggin();
    }
  }, [uid]);

  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
    >
      <Box>
        <Heading
          fontFamily="inherit"
          color={colors.main}
          fontWeight="800"
          fontSize="52px"
          mb="20px"
        >
          Log in
        </Heading>

        <form onSubmit={handleForm} className="form">
          <FormLabel htmlFor="email">
            <Text
              color={colors.main}
              fontSize="24px"
              fontWeight="700"
            >
              Email
            </Text>

            <Input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
            />
          </FormLabel>

          <FormLabel htmlFor="password" mb="20px">
            <Text
              color={colors.main}
              fontSize="24px"
              fontWeight="700"
            >
              Password
            </Text>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
          </FormLabel>

          <Button
            colorScheme="teal"
            variant="outline"
            type="submit"
          >
            Log in
          </Button>
        </form>
      </Box>
    </Flex>
  );
};
