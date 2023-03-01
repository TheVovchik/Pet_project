/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
import React from 'react';
import { Image } from '@chakra-ui/react';
import { HeaderDesktop } from '../../components/HeaderDesktop';
import bg from '../../IMAGES/main-bg.png';

export const HomePage = () => {
  // const []

  return (
    <div className="content">
      <HeaderDesktop />

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
