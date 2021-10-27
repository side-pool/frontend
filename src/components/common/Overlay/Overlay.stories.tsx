import React from 'react';
import { Story, Meta } from '@storybook/react';

import Overlay from '@src/components/common/Overlay';

export default {
  title: 'Common/Overlay',
} as Meta;

export const overlay: Story<React.HTMLAttributes<HTMLDivElement>> = () => {
  return <Overlay />;
};
