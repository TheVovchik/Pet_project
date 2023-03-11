/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Button, Card, CardBody,
  CardFooter, Flex, Heading,
  Image, Stack, Text,
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
  const [posts, setPosts] = useState<Post[]>([]);
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
          <Flex
            display="column"
            p={isMobile ? '30px 14px' : '30px 50px'}
          >
            {posts.map((post) => {
              const { title, coversUrl, descriptions } = post;
              const isSingleImage = coversUrl.length < 2;
              const haveAnyImage = coversUrl.length > 0;

              return (
                <Card
                  key={uuid()}
                  direction={{ base: 'column', sm: 'column' }}
                  p="20px"
                  overflow="hidden"
                  variant="outline"
                >
                  {isSingleImage && (
                    <Box
                      width={isMobile ? '350px' : '450px'}
                      height={isMobile ? '350px' : '450px'}
                      mb="20px"
                      pos="relative"
                    >
                      <Image
                        src={haveAnyImage ? coversUrl[0] : Default}
                        alt="default"
                        width={isMobile ? '350px' : '450px'}
                        height={isMobile ? '350px' : '450px'}
                        objectFit="contain"
                        objectPosition="center"
                      />
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
                                  width={isMobile ? '350px' : '450px'}
                                  height={isMobile ? '350px' : '450px'}
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
                    <CardBody>
                      <Heading
                        fontFamily="inherit"
                        color={colors.main}
                        fontWeight="800"
                        fontSize="24px"
                        mb="20px"
                      >
                        {title}
                      </Heading>

                      {descriptions.map((descr, idx) => {
                        const isEmpty = descr === ' ';

                        return (
                          <Fragment key={`element${descr} ${idx}`}>
                            {isEmpty && <br />}
                            {!isEmpty && (
                              <Text
                                fontSize="16px"
                                fontWeight="500"
                                color="black"
                              >
                                {descr}
                              </Text>
                            )}
                          </Fragment>
                        );
                      })}
                    </CardBody>

                    <CardFooter>
                      <Button variant="solid" colorScheme="blue">
                        Buy Latte
                      </Button>
                    </CardFooter>
                  </Stack>
                </Card>
              );
            })}
          </Flex>
        )}
      </div>

      {isMobile ? <FooterMobile /> : <FooterDesktop />}
    </div>
  );
};
