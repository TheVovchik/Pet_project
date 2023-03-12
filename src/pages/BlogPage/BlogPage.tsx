/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Card, CardBody,
  Flex, Grid, Heading,
  Image, Stack, Text, useMediaQuery,
} from '@chakra-ui/react';
import {
  useEffect, useState, CSSProperties, Fragment,
} from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { Zoom, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import bg from '../../IMAGES/main-bg.png';
import Default from '../../IMAGES/admin/default.png';
import { FooterDesktop } from '../../components/FooterDesktop';
import { FooterMobile } from '../../components/FooterMobile';
import { HeaderDesktop } from '../../components/HeaderDesktop';
import { HeaderMobile } from '../../components/HeaderMobile';
import useWindowDimensions from '../../hooks/useDeviceWidthChecker';
import { dataBase } from '../../firebase/config';
import { Post } from '../../types/Post';
import { Loader } from '../../components/Loader';
import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { colors } from '../../style/colors';

export const BlogPage = () => {
  const [active, setActive] = useState<number | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLargerThan1440] = useMediaQuery('(min-width: 1440px)');
  const [loading, setLoading] = useState(true);
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const collectionRef = collection(dataBase, 'posts');

  const getData = async () => {
    setLoading(true);

    await getDocs(collectionRef)
      .then((response) => {
        setPosts(response.docs.map((item) => item.data() as Post));
      });

    setLoading(false);
  };

  const handleReadMore = (idx: number) => {
    setActive(idx);
  };

  const handleCollapse = () => {
    setActive(null);
  };

  useEffect(() => {
    getData();
  }, []);

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
        {loading && (
          <Flex h="100%" w="100%" align="center" justify="center">
            <Loader />
          </Flex>
        )}

        {!loading && (
          <Grid
            templateColumns={isMobile ? '1fr' : '1fr 1fr'}
            gap="20px"
            p={isMobile ? '30px 14px' : '30px 30px'}
          >
            {posts.map((post, idx) => {
              const { title, coversUrl, description } = post;
              const isSingleImage = coversUrl.length < 2;
              const haveAnyImage = coversUrl.length > 0;
              const key = uuid();
              const isActive = idx === active;

              return (
                <Flex
                  direction="column"
                  mb="30px"
                  key={key}
                >
                  <Card
                    direction={{
                      base: 'column',
                      sm: isLargerThan1440 ? 'row' : 'column',
                    }}
                    maxH={isActive ? 'auto' : '450px'}
                    p={isLargerThan1440 ? '20px' : '10px'}
                    overflowY={isActive ? 'auto' : 'hidden'}
                    variant="outline"
                  >
                    {isSingleImage && (
                      <Box
                        width="300px"
                        minW="300px"
                        height="300px"
                        minH="300px"
                        m="0 auto 20px"
                        pos="relative"
                      >
                        <Image
                          src={haveAnyImage ? coversUrl[0] : Default}
                          alt="default"
                          width="300px"
                          height="300px"
                          objectFit="contain"
                          objectPosition="center"
                        />
                      </Box>
                    )}

                    {!isSingleImage && (
                      <Box
                        width="300px"
                        height="300px"
                        m="0 auto 20px"
                      >
                        <Swiper
                          style={{
                            '--swiper-navigation-color': '#FFBA08',
                            '--swiper-pagination-color': '#FFBA08',
                            '--swiper-pagination-bullet-inactive-color': '#999',
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
                          {coversUrl.map((cover) => {
                            return (
                              <SwiperSlide key={cover}>
                                <Box
                                  className="swiper-zoom-container"
                                  pos="relative"
                                >
                                  <Image
                                    src={cover}
                                    alt="default"
                                    width="300px"
                                    height="300px"
                                    objectFit="contain"
                                    objectPosition="center"
                                  />
                                </Box>
                              </SwiperSlide>
                            );
                          })}
                        </Swiper>
                      </Box>
                    )}

                    <Stack>
                      <CardBody
                        overflowY={isActive ? 'auto' : 'hidden'}
                      >
                        <Heading
                          fontFamily="inherit"
                          color={colors.main}
                          fontWeight="800"
                          fontSize="24px"
                          mb="20px"
                        >
                          {title}
                        </Heading>

                        <Box
                          alignSelf="flex-start"
                          width="100%"
                          className="textbox"
                          dangerouslySetInnerHTML={{
                            __html: description,
                          }}
                        />
                      </CardBody>
                    </Stack>
                  </Card>
                  <Text
                    cursor="pointer"
                    color={isActive ? 'green' : 'black'}
                    onClick={
                      isActive
                        ? () => handleCollapse()
                        : () => handleReadMore(idx)
                    }
                  >
                    {isActive ? 'Згорнути' : 'Читати повністю'}
                  </Text>
                </Flex>

              );
            })}
          </Grid>
        )}
      </div>

      {isMobile ? <FooterMobile /> : <FooterDesktop />}
    </div>
  );
};
