import React, { useEffect } from 'react';
import { setLoading, useAppDispatch, useUiState } from '@src/store';
import cn from 'classnames';
import api from '@src/api/context';
import { ACCESS_TOKEN, saveItem } from '@src/utils/storage';
import { CardWithContent } from '@src/components/common/Card/Card.stories';
import { LabelTags } from '@src/components/common/LabelTag/LabelTag.stories';

const HIGHLIGHT = 'highlight';

const LandingPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useUiState();

  useEffect(() => {
    (async () => {
      await saveItem(ACCESS_TOKEN, 'testtesttest');
      const { data } = await api.get('/');
      console.log(data);
    })();
  }, []);

  return (
    <div>
      <button
        type="button"
        onClick={() => dispatch(setLoading({ isLoading: !isLoading }))}
      >
        toggle
      </button>
      <div>
        {isLoading ? <p>loading</p> : <p className={cn(HIGHLIGHT)}>break</p>}
      </div>
      <CardWithContent />
      <LabelTags />
    </div>
  );
};

export default LandingPage;
