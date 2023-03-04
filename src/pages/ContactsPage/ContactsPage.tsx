import { Image } from '@chakra-ui/react';
import React from 'react';
import bg from '../../IMAGES/main-bg.png';
import { HeaderDesktop } from '../../components/HeaderDesktop';
import { HeaderMobile } from '../../components/HeaderMobile';
import useWindowDimensions from '../../hooks/useDeviceWidthChecker';
import { ContactsMobile } from '../../components/ContactsMobile';

export const ContactsPage = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <div className="content">
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
        <ContactsMobile />
      </div>

      {/* {isMobile ? <FooterMobile /> : <FooterDesktop />} */}
    </div>
  );
};
