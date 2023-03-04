import {
  Box,
  Flex, Image, Link, Text, useMediaQuery,
} from '@chakra-ui/react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/fontawesome-free-solid';
import {
  faLocationDot, faCalendarWeek,
} from '@fortawesome/free-solid-svg-icons';
import Pande from '../../IMAGES/footer/panda.png';
import bg from '../../IMAGES/footer/bg.png';
import { colors } from '../../style/colors';
import { googleMapRedirectUrl } from '../../constants/links';
import { SocialLinks } from '../SocialLinks';
import { GoogleMap } from '../GoogleMap';

export const FooterContactsDesktop = () => {
  const [isLargerThan1200] = useMediaQuery('(min-width: 1200px)');

  return (
    <Box
      bgImg={bg}
      bgPos="top right"
      bgSize="cover"
      bgRepeat="no-repeat"
    >
      <Flex
        pos="relative"
        p="20px"
        gap="20px"
        align="center"
      >
        <Image
          h={isLargerThan1200 ? '70%' : '60%'}
          pos="absolute"
          src={Pande}
          alt="Панда"
          top="50%"
          transform="translateY(-50%)"
          right="0"
          opacity="0.6"
          zIndex="2"
        />

        <Flex
          direction="column"
          gap="10px"
          minW="320px"
        >

          <Flex
            align="center"
          >
            <FontAwesomeIcon
              icon={faPhone as IconProp}
              style={{
                marginRight: '8px',
                fontSize: '40px',
                color: colors.main,
              }}
            />

            <Flex
              direction="column"
            >
              <Link
                href="tel:+380989066988"
                color={colors.main}
                _hover={{
                  textDecoration: 'none',
                }}
                fontSize="20px"
                fontWeight="700"
              >
                098 906 69 88
              </Link>

              <Link
                href="tel:+380994276013"
                color={colors.main}
                _hover={{
                  textDecoration: 'none',
                }}
                fontSize="20px"
                fontWeight="700"
              >
                099 427 60 13
              </Link>
            </Flex>
          </Flex>

          <Flex
            align="center"
          >
            <FontAwesomeIcon
              icon={faLocationDot as IconProp}
              style={{
                marginRight: '8px',
                fontSize: '40px',
                color: colors.main,
              }}
            />

            <Flex
              direction="column"
            >
              <Link
                href={googleMapRedirectUrl}
                color={colors.main}
                target="blanc"
                _hover={{
                  textDecoration: 'none',
                }}
                fontSize="20px"
                fontWeight="700"
              >
                пр-т Б. Хмельницького, 139
                <br />
                Дніпро, Україна, 49000
              </Link>
            </Flex>
          </Flex>

          <Flex
            align="center"
          >
            <FontAwesomeIcon
              icon={faCalendarWeek as IconProp}
              style={{
                marginRight: '8px',
                fontSize: '40px',
                color: colors.main,
              }}
            />

            <Flex
              direction="column"
            >
              <Text
                color={colors.main}
                fontSize="20px"
                fontWeight="700"
              >
                08:00 - 19:00
                <br />
                без вихідних
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Box
          pr="200px"
          w="100%"
        >
          <GoogleMap />
        </Box>
      </Flex>

      <SocialLinks />
    </Box>
  );
};
