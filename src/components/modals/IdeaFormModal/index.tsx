import React, { useCallback, useRef, useState, useEffect } from 'react';
import cn from 'classnames';
import styles from './IdeaFormModal.module.scss';
import Card from '@src/components/common/Card';
import { convertPortal } from '@src/utils/portalUtils';
import { useCreateIdea, useUpdateIdea } from '@src/hooks/useIdeaQuery';
import Input, { ParentRef } from '@src/components/common/Input';
import Textarea, { TextareaParentRef } from '@src/components/common/Textarea';
import HashtagInput, { Hashtag } from '@src/components/HashtagInput';
import { v4 as uuidv4 } from 'uuid';
import { GuideText } from '@src/constant/enums';

import Overlay from '@src/components/common/Overlay';
import ModalTop from '@src/components/modals/ModalTop';
import ModalBottom from '@src/components/modals/ModalBottom';
import { QueryClient } from 'react-query';

export interface IdeaFormModalProps {
  hideIdeaForm: (event?: React.MouseEvent) => void;
  className?: string;
  showAlert: (title: string) => void;
  isCreate?: boolean;
  initialValue?: {
    title: string;
    content: string;
    hashtags: string[];
  };
  id?: number;
}

const Template = ({
  hideIdeaForm,
  className,
  showAlert,
  isCreate,
  initialValue = {
    title: '',
    content: '',
    hashtags: [],
  },
  id,
}: IdeaFormModalProps) => {
  const queryClient = new QueryClient();

  const titleRef = useRef({} as ParentRef);
  const contentRef = useRef({} as TextareaParentRef);
  const [hashtag, setHashtag] = useState<string>('');
  const [hashtagArr, setHashtagArr] = useState<Hashtag[]>(
    initialValue.hashtags.reduce<Hashtag[]>(
      (acc: Hashtag[], cur: string) => [...acc, { id: uuidv4(), content: cur }],
      [],
    ),
  );

  useEffect(() => {
    titleRef.current.set(initialValue.title);
    contentRef.current.set(initialValue.content);
  }, []);

  const createIdeaMutation = useCreateIdea();
  const updateIdeaMutation = useUpdateIdea(id || 0);

  const onKeyUp = useCallback(
    (e) => {
      if (
        (e.keyCode === 13 || e.keyCode === 32) &&
        hashtag.length !== 0 &&
        hashtag.trim()
      ) {
        if (
          hashtagArr.some(({ content }) => content.trim() === hashtag.trim())
        ) {
          setHashtag('');
          return showAlert(GuideText.DUPLICATE);
        }
        setHashtagArr((prev) => [
          ...prev,
          { id: uuidv4(), content: hashtag.trim() },
        ]);
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

  const handleCreateIdea = () => {
    const title = titleRef.current.get() || '';
    const content = contentRef.current.get() || '';

    if (title.length < 1 || content.length < 1) {
      showAlert(GuideText.FILL_ALL_FORM);
      return;
    }

    if (hashtag.length > 0) {
      if (hashtagArr.some(({ content }) => content.trim() === hashtag.trim())) {
        setHashtag('');
      } else {
        setHashtagArr((prev) => [
          ...prev,
          { id: uuidv4(), content: hashtag.trim() },
        ]);
        setHashtag('');
      }
    }

    (isCreate ? createIdeaMutation : updateIdeaMutation).mutate(
      {
        title,
        content,
        hashtags: hashtagArr
          ?.filter(({ content }) => content.length > 0)
          .reduce<string[]>(
            (acc: Partial<string>[], cur: Hashtag) => [...acc, cur.content],
            [],
          ),
      },
      {
        onSuccess: () => {
          hideIdeaForm();
          showAlert(`???????????? ${isCreate ? '??????' : '??????'}??? ?????????????????????.`);
        },
      },
    );
  };

  return (
    <div
      className={cn(styles.IdeaFormModal, className)}
      data-testid="modal"
      aria-hidden="true"
    >
      <Overlay onClick={hideIdeaForm} />
      <Card className={styles.ideaFormCard}>
        <ModalTop title="???????????? ????????????" />
        <div className={styles.content}>
          <div className={styles.titleArea}>
            <Input ref={titleRef} placeholder="????????? ??????????????????." maxWidth />
          </div>
          <div className={styles.contentArea}>
            <Textarea
              ref={contentRef}
              placeholder="????????? ??????????????????."
              maxWidth
              maxLength={255}
            />
          </div>
          <div className={styles.hashtagArea}>
            <HashtagInput
              maxWidth
              hashtagArr={hashtagArr}
              deleteHashtag={handleDeleteHashtag}
              placeholder={
                hashtagArr.length === 0 ? '#??? ????????? ????????? ??????????????????.' : ''
              }
              type="text"
              value={hashtag}
              onChange={({ target: { value } }) => setHashtag(value)}
              onKeyUp={onKeyUp}
            />
          </div>
        </div>
        <ModalBottom
          handleConfirm={handleCreateIdea}
          handleCancel={hideIdeaForm}
          confirmText={isCreate ? '??????' : '??????'}
        />
      </Card>
    </div>
  );
};

const IdeaFormModal = ({ ...props }: IdeaFormModalProps) =>
  convertPortal(<Template {...props} />);

export default IdeaFormModal;
