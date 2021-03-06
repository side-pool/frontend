import React from 'react';
import { Story, Meta } from '@storybook/react';
import LabelTag, {
  CommentTag,
  HashTag,
  LabelTagProps,
} from '@src/components/common/LabelTag';

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

export const LabelTags = () => {
  const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'fit-content',
  };

  return (
    <div style={style}>
      <LabelTag wrapperColor="beige" textColor="orange">
        제안해요
      </LabelTag>
      <LabelTag wrapperColor="orange" textColor="white">
        해결되었어요
      </LabelTag>
      <HashTag wrapperColor="gray" textColor="white">
        # 해시태그
      </HashTag>
    </div>
  );
};

export const CommentTags = () => {
  const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'fit-content',
  };

  return (
    <div style={style}>
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <CommentTag key={i} commentTag={i} />
        ))}
    </div>
  );
};
