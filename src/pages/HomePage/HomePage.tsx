/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
import {
  Flex, Image,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { HeaderDesktop } from '../../components/HeaderDesktop';
import bg from '../../IMAGES/main-bg.png';
import Logo from '../../IMAGES/main/panda.gif';
import { AppDispatch } from '../../storage/store';
import { colors } from '../../style/colors';
import * as enterActions from '../../storage/features/enter';
import { useAppSelector } from '../../storage/hooks';
import useWindowDimensions from '../../hooks/useDeviceWidthChecker';
import { HeaderMobile } from '../../components/HeaderMobile';

export const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useAppSelector(store => store.enter);
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const handleClick = () => {
    dispatch(enterActions.actions.setStatus(false));
  };

  return (
    <div className="content">
      <Flex
        display={status ? 'flex' : 'none'}
        zIndex="10"
        opacity="1"
        pos="absolute"
        top="0"
        right="0"
        w="100vw"
        h="100vh"
        align="center"
        justify="center"
        bg={colors.main}
      >
        <Flex
          w="300px"
          h="300px"
          bg="white"
          borderRadius="50%"
          align="center"
          justify="center"
        >
          <Image
            cursor="pointer"
            w="80%"
            h="auto"
            src={Logo}
            alt="Ветеринарна клініка Панда"
            onClick={handleClick}
          />
        </Flex>
      </Flex>

      {isMobile ? <HeaderMobile /> : <HeaderDesktop />}

      <Image
        pos="absolute"
        zIndex="-4"
        top="0"
        right="0"
        h="auto"
        maxW="50%"
        src={bg}
        alt="background"
      />

      <div className="content__main">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus ea corrupti illo? Praesentium maiores nemo sequi distinctio, facilis vel ipsum doloribus mollitia minus, consequuntur nam accusantium, omnis sed vero provident!
        </p>
      </div>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus ea corrupti illo? Praesentium maiores nemo sequi distinctio, facilis vel ipsum doloribus mollitia minus, consequuntur nam accusantium, omnis sed vero provident!
      </p>
    </div>
  );
};
