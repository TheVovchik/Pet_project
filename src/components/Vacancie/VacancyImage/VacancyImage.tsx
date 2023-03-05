import { Box, Image } from '@chakra-ui/react';
import React, { FC } from 'react';
import Default from '../../../IMAGES/admin/default.png';
import useWindowDimensions from '../../../hooks/useDeviceWidthChecker';

type Props = {
  image: string,
};

export const VacancyImage: FC<Props> = ({ image }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <Box
      width={isMobile ? '200px' : '400px'}
      height={isMobile ? '200px' : '400px'}
      mb="20px"
    >
      <Image
        src={image || Default}
        alt="default"
        width={isMobile ? '200px' : '400px'}
        height={isMobile ? '200px' : '400px'}
        objectFit="contain"
        objectPosition="center"
      />
    </Box>
  );
};
