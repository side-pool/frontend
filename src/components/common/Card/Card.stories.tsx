import React from 'react';
import { Meta } from '@storybook/react';
import Card from '@src/components/common/Card';
import Typography from '@src/components/common/Typography';

export default {
  title: 'Common/Card',
  component: Card,
} as Meta;

export const EmptyCard = () => <Card />;

export const CardWithContent = () => {
  return (
    <Card>
      <Typography textAlign={'center'} lineHeight={'wide'} fontSize={'xl'}>
        The Old Man and the Sea
      </Typography>
      <br />
      <Typography fontSize={'md'}>
        &quot;But man is not made for defeat,”&nbsp;&nbsp;he said.&nbsp;&nbsp;“A
        man can be destroyed but not defeated.&quot;
      </Typography>
    </Card>
  );
};
