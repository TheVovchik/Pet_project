import {
  Box, Button, Flex, FormLabel, Heading, Input, Text, useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import LogginStatus from '../../firebase/LogginStatus';
import signIn from '../../firebase/signIn';
import { useAppSelector } from '../../storage/hooks';
import { AppDispatch } from '../../storage/store';
import { colors } from '../../style/colors';
import { setInLocalStorage } from '../../utils/localStorage';
import * as adminActions from '../../storage/features/admin';

export const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { uid, signedIn } = useAppSelector(store => store.admin);
  const navigate = useNavigate();
  const toast = useToast();

  const handleForm = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const { result, error } = await signIn(email, password);

    setLoading(false);

    if (error) {
      toast({
        title: 'ERROR',
        description: 'Email or password not valid',
        status: 'warning',
        duration: 2000,
        isClosable: false,
        variant: 'top-accent',
        position: 'top',
      });

      return;
    }

    if (result) {
      toast({
        title: 'SUCCESS',
        description: 'Welcome to admin panel',
        status: 'success',
        duration: 2000,
        isClosable: false,
        variant: 'top-accent',
        position: 'top',
      });
      setInLocalStorage('uid', result.user.uid);
      setInLocalStorage('signedIn', true);
      dispatch(adminActions.actions.setUserLogin(result.user.uid));
      navigate('/admin');
    }
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
    <>
      {loading
        ? (
          <Flex h="100vh" w="100vw" align="center" justify="center">
            <Loader />
          </Flex>
        )
        : (
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
        )}
    </>
  );
};
