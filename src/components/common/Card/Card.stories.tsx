import React from 'react';
import { Meta } from '@storybook/react';
import Card from '@src/components/common/Card';
import Text from '@src/components/common/Text';

export default {
  title: 'Card',
  component: Card,
} as Meta;

export const EmptyCard = () => <Card />;

export const CardWithContent = () => {
  return (
    <Card>
      <Text textAlign={'center'} lineHeight={'wide'} fontSize={'xl'}>
        The Old Man and the Sea
      </Text>
      <br />
      <Text fontSize={'md'}>
        &quot;But man is not made for defeat,”&nbsp;&nbsp;he said.&nbsp;&nbsp;“A
        man can be destroyed but not defeated.&quot;
      </Text>
    </Card>
  );
};
