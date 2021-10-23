import React from 'react';
import { Story, Meta } from '@storybook/react';

import Overlay, { OverlayProps } from '@src/components/common/Overlay';

export default {
  title: 'Common/Overlay',
} as Meta;

export const overlay: Story<OverlayProps> = () => {
  return <Overlay />;
};
