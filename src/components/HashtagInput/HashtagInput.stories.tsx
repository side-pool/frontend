import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Story, Meta } from '@storybook/react';
import HashtagInput, {
  HashtagInputProps,
  Hashtag,
} from '@src/components/HashtagInput';

export default {
  title: 'components/HashtagInput',
  component: HashtagInput,
} as Meta;

const Template: Story<HashtagInputProps> = () => {
  const [hashtag, setHashtag] = useState<string>('');
  const [hashtagArr, setHashtagArr] = useState<Hashtag[]>([]);

  const onKeyUp = useCallback(
    (e) => {
      if (
        (e.keyCode === 13 || e.keyCode === 32) &&
        hashtag.length !== 0 &&
        hashtag.trim()
      ) {
        setHashtagArr((prev) => [...prev, { id: uuidv4(), content: hashtag }]);
        setHashtag('');
      }
      if (e.keyCode === 8 && hashtag.length === 0) {
        setHashtagArr((prev) => prev.slice(0, -1));
      }
    },
    [hashtag, hashtagArr],
  );

  const handleDeleteHashtag = (targetId: string) => {
    setHashtagArr((prev) => prev.filter(({ id }) => targetId !== id));
  };

  return (
    <HashtagInput
      maxWidth
      hashtagArr={hashtagArr}
      deleteHashtag={handleDeleteHashtag}
      placeholder={
        hashtagArr.length === 0 ? '#을 이용해 태그를 입력해보세요.' : ''
      }
      type="text"
      value={hashtag}
      onChange={({ target: { value } }) => setHashtag(value)}
      onKeyUp={onKeyUp}
    />
  );
};

export const hashtagInput = Template.bind({});
