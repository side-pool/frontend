import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import {
  CommentTab,
  SimilarServiceTab,
} from '@src/components/common/ButtonTab';
import { UserTab } from '@src/constant/enums';

export default {
  title: 'Common/ButtonTab',
} as Meta;

export const buttonTab = () => {
  const [tabToggle, setTabToggle] = useState(UserTab.COMMENT);

  const styles = {
    width: 'fit-content',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, auto)',
    columnGap: '12px',
  };

  return (
    <div style={styles}>
      <CommentTab
        active={tabToggle === UserTab.COMMENT}
        onClick={() => {
          setTabToggle(UserTab.COMMENT);
        }}
      />
      <SimilarServiceTab
        active={tabToggle === UserTab.SIMILAR_SERVICE}
        onClick={() => {
          setTabToggle(UserTab.SIMILAR_SERVICE);
        }}
      />
    </div>
  );
};
