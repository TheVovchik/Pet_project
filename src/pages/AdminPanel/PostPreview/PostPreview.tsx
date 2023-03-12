/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Flex, Heading, IconButton, Image,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { Zoom, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CSSProperties, useState, Fragment } from 'react';
import { DeleteIcon } from '@chakra-ui/icons';
import { useAppSelector } from '../../../storage/hooks';
import { colors } from '../../../style/colors';
import Default from '../../../IMAGES/admin/default.png';
import * as postActions from '../../../storage/features/post';
import { AppDispatch } from '../../../storage/store';
import useWindowDimensions from '../../../hooks/useDeviceWidthChecker';
import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './PostPreview.scss';

export const PostPreview = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const dispatch = useDispatch<AppDispatch>();

  const {
    covers, coversUrl, title, description,
  } = useAppSelector(store => store.post);
  const isSingleImage = (covers.length + coversUrl.length) < 2;
  const haveAnyImage = covers.length > 0 || coversUrl.length > 0;

  const handleCoverRemove = (cover: string) => {
    dispatch(postActions.actions.deleteCover(cover));
  };

  const handleCoverUrlRemove = (cover: string) => {
    dispatch(postActions.actions.deleteCoverUrl(cover));
  };

  return (
    <Flex
      maxH="100vh"
      direction="column"
      align="center"
      overflowY="auto"
    >
      {isSingleImage && (
        <Box
          width={isMobile ? '350px' : '450px'}
          height={isMobile ? '350px' : '450px'}
          mb="20px"
          pos="relative"
        >
          <Image
            src={haveAnyImage ? covers[0] || coversUrl[0] : Default}
            alt="default"
            width={isMobile ? '350px' : '450px'}
            height={isMobile ? '350px' : '450px'}
            objectFit="contain"
            objectPosition="center"
          />

          {haveAnyImage && (
            <IconButton
              pos="absolute"
              right="0"
              top="0"
              color="white"
              bg="darkred"
              _hover={{
                bg: 'red',
              }}
              aria-label="Call Segun"
              size="sm"
              onClick={() => handleCoverRemove(covers[0])}
              icon={<DeleteIcon />}
            />
          )}
        </Box>
      )}

      {!isSingleImage && (
        <Box
          width={isMobile ? '350px' : '450px'}
          height={isMobile ? '350px' : '450px'}
          mb="20px"
        >
          <Swiper
            style={{
              '--swiper-navigation-color': '#FFBA08',
              '--swiper-pagination-color': '#FFBA08',
              '--swiper-pagination-bullet-inactive-color': '#999999',
              '--swiper-pagination-bullet-inactive-opacity': '1',
              '--swiper-pagination-bullet-size': '16px',
              '--swiper-pagination-bullet-horizontal-gap': '6px',
            } as CSSProperties}
            zoom
            navigation
            pagination={{
              clickable: true,
            }}
            modules={[Zoom, Navigation, Pagination]}
            className="mySwiper"
          >
            {covers.length > 0 && covers.map((cover) => {
              return (
                <SwiperSlide key={cover}>
                  <Box className="swiper-zoom-container" pos="relative">
                    <Image
                      src={cover}
                      alt="default"
                      width={isMobile ? '350px' : '450px'}
                      height={isMobile ? '350px' : '450px'}
                      objectFit="contain"
                      objectPosition="center"
                    />

                    <IconButton
                      pos="absolute"
                      right="0"
                      top="0"
                      color="white"
                      bg="darkred"
                      _hover={{
                        bg: 'red',
                      }}
                      aria-label="Call Segun"
                      size="sm"
                      onClick={() => handleCoverRemove(cover)}
                      icon={<DeleteIcon />}
                    />
                  </Box>
                </SwiperSlide>
              );
            })}

            {coversUrl.length > 0 && coversUrl.map((cover) => {
              return (
                <SwiperSlide key={cover}>
                  <Box className="swiper-zoom-container" pos="relative">
                    <Image
                      src={cover}
                      alt="default"
                      width={isMobile ? '350px' : '450px'}
                      height={isMobile ? '350px' : '450px'}
                      objectFit="contain"
                      objectPosition="center"
                    />

                    <IconButton
                      pos="absolute"
                      right="0"
                      top="0"
                      color="white"
                      bg="darkred"
                      _hover={{
                        bg: 'red',
                      }}
                      aria-label="Call Segun"
                      size="sm"
                      onClick={() => handleCoverUrlRemove(cover)}
                      icon={<DeleteIcon />}
                    />
                  </Box>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>
      )}

      <Heading
        fontFamily="inherit"
        color={colors.main}
        fontWeight="800"
        fontSize="24px"
        mb="20px"
      >
        {title || 'Назва статті'}
      </Heading>

      <Box
        alignSelf="flex-start"
        width="100%"
        className="textbox"
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      />
    </Flex>
  );
};
