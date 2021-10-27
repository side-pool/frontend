import React, { Fragment } from 'react';
import { Story, Meta } from '@storybook/react';
import LabelTag, { LabelTagProps } from '@src/components/common/LabelTag';

export default {
  title: 'Common/LabelTag',
  component: LabelTag,
} as Meta;

const Template: Story<LabelTagProps> = (props) => <LabelTag {...props} />;
export const ALabelTag = Template.bind({});

ALabelTag.args = {
  children: '# 해시태그',
  isDeleteButton: false,
};

export const LabelTags = () => (
  <Fragment>
    <LabelTag wrapperColor="beige" textColor="orange">
      제안해요
    </LabelTag>
    <LabelTag wrapperColor="orange" textColor="white">
      해결되었어요
    </LabelTag>
    <LabelTag wrapperColor="gray" textColor="white">
      # 해시태그
    </LabelTag>
  </Fragment>
);
