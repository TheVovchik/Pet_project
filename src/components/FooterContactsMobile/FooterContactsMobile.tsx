import {
  Box,
  Flex, Image, Link, Text,
} from '@chakra-ui/react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/fontawesome-free-solid';
import {
  faLocationDot, faCalendarWeek,
} from '@fortawesome/free-solid-svg-icons';
import Pande from '../../IMAGES/footer/panda.png';
import { colors } from '../../style/colors';
import { googleMapRedirectUrl } from '../../constants/links';
import { SocialLinks } from '../SocialLinks';

export const FooterContactsMobile = () => {
  return (
    <Box>
      <Flex
        direction="column"
        pos="relative"
        p="10px"
        gap="10px"
      >
        <Image
          h="100%"
          pos="absolute"
          src={Pande}
          alt="Панда"
          top="0"
          right="0"
          opacity="0.6"
        />

        <Flex
          align="center"
        >
          <FontAwesomeIcon
            icon={faPhone as IconProp}
            style={{ marginRight: '8px', fontSize: '32px', color: colors.main }}
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
              fontSize="16px"
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
              fontSize="16px"
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
            style={{ marginRight: '8px', fontSize: '32px', color: colors.main }}
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
              fontSize="16px"
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
            style={{ marginRight: '8px', fontSize: '32px', color: colors.main }}
          />

          <Flex
            direction="column"
          >
            <Text
              color={colors.main}
              fontSize="16px"
              fontWeight="700"
            >
              08:00 - 19:00
              <br />
              без вихідних
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <SocialLinks />
    </Box>
  );
};
