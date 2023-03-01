/* eslint-disable import/no-extraneous-dependencies */
import { extendTheme } from '@chakra-ui/react';

import { components } from './components';

const overrides = {
  components,
};

export default extendTheme(overrides);
