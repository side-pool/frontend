import React from 'react';
import { Meta } from '@storybook/react';
import Card from '@src/components/common/Card';
import Text from '@src/components/common/Text';
import { ExampleText } from '@src/components/common/Text/Text.stories';

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
      <ExampleText />
    </Card>
  );
};
