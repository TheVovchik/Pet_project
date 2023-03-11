import { Flex, Heading, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import {
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import bg from '../../IMAGES/main-bg.png';
import { HeaderDesktop } from '../../components/HeaderDesktop';
import { HeaderMobile } from '../../components/HeaderMobile';
import useWindowDimensions from '../../hooks/useDeviceWidthChecker';
import { dataBase } from '../../firebase/config';
import { Vacancy } from '../../types/Vacancy';
import { FooterDesktop } from '../../components/FooterDesktop';
import { FooterMobile } from '../../components/FooterMobile';
import { colors } from '../../style/colors';
import { Vacancie } from '../../components/Vacancie';
import { Loader } from '../../components/Loader';

export const VacanciesPage = () => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const noActualVacancies = vacancies.length === 0;
  const collectionRef = collection(dataBase, 'vacancy');

  const getData = async () => {
    setLoading(true);

    await getDocs(collectionRef)
      .then((response) => {
        setVacancies(response.docs.map((item) => item.data() as Vacancy));
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
        {!loading && noActualVacancies && (
          <Heading
            textAlign="center"
            fontFamily="inherit"
            color={colors.main}
            fontWeight="800"
            fontSize="40px"
            mb="20px"
            p="50px 80px"
          >
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              style={{
                marginRight: '12px',
                fontSize: '60px',
                color: 'red',
              }}
            />
            На даний час не маємо вакантних позицій
          </Heading>
        )}

        {!loading && !noActualVacancies && (
          <Flex
            display="column"
            p={isMobile ? '30px 14px' : '30px 50px'}
          >
            {vacancies.map((vacancie) => {
              return (
                <Vacancie key={uuid()} vacancie={vacancie} />
              );
            })}
          </Flex>
        )}
      </div>

      {isMobile ? <FooterMobile /> : <FooterDesktop />}
    </div>
  );
};
