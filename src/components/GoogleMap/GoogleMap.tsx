/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import { Box } from '@chakra-ui/react';
import {
  FC, useCallback, useEffect, useRef, useState,
} from 'react';
import {
  GoogleMap as GoogleMapReact,
  useLoadScript,
  Marker,
} from '@react-google-maps/api';
import { googleMapRedirectUrl } from '../../constants/links';

type Position = {
  lat: number,
  lng: number,
};

type Props = {
  width: string,
  height: string,
};

export const GoogleMap: FC<Props> = ({
  width,
  height,
}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_KEY as string,
  });
  const [pos, setPos] = useState<Position | null>(null);
  const defaultProps = {
    center: {
      lat: 48.3965,
      lng: 35.00048,
    },
    zoom: 15,
  };

  const mapRef = useRef<any>(null);
  const onMapLoad = useCallback((map: any) => {
    mapRef.current = map;
  }, []);

  const handleOpenLocation = () => {
    // eslint-disable-next-line max-len
    window.open(googleMapRedirectUrl, 'blanc');
  };

  useEffect(() => {
    navigator?.geolocation
      .getCurrentPosition(({ coords: { latitude: lat, longitude: lng } }) => {
        const currentPos = { lat, lng };

        setPos(currentPos);
      });
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (loadError) {
    return <div>Something went wrong</div>;
  }

  return (
    <Box
      m="0 auto"
      w={width}
      h={height}
      bg="rgba(84,115,158,.06)"
      borderRadius="30px"
      p="10px"
    >
      <GoogleMapReact
        id="map"
        mapContainerStyle={{
          width: '100%', height: '100%', borderRadius: '30px',
        }}
        center={defaultProps.center}
        zoom={defaultProps.zoom}
        onLoad={onMapLoad}
        options={{
          draggable: true,
          mapTypeControl: false,
          fullscreenControlOptions: {
            position: 9.0,
          },
        }}
      >
        <Marker
          position={defaultProps.center}
          title="Ветеринарна клініка Панда"
          onClick={handleOpenLocation}
        />

        {pos && (
          <Marker
            position={pos}
            title="Ваша локація"
          />
        )}
      </GoogleMapReact>

    </Box>
  );
};
