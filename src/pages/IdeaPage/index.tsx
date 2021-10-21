import React, { useState, useRef, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

import styles from './IdeaPage.module.scss';

import Modal from '@src/components/common/Modal';
import Input, { ParentRef } from '@src/components/common/Input';
import Textarea, { TextareaParentRef } from '@src/components/common/Textarea';
import HashtagInput, { Hashtag } from '@src/components/HashtagInput';

import Button from '@src/components/common/Button';

import { useCreateIdea } from '@src/hooks/useIdeaQuery';

import { useAppDispatch, showAlertModal } from '@src/store';
import { GuideText } from '@src/constant/enums';

const IdeaPage = () => {
  const dispatch = useAppDispatch();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);

  const titleRef = useRef({} as ParentRef);
  const contentRef = useRef({} as TextareaParentRef);
  const [hashtag, setHashtag] = useState<string>('');
  const [hashtagArr, setHashtagArr] = useState<Hashtag[]>([]);

  const createIdeaMutation = useCreateIdea();

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

  const handleCreateIdea = () => {
    const title = titleRef.current.get() || '';
    const content = contentRef.current.get() || '';

    if (title.length < 1 || content.length < 1) {
      dispatch(
        showAlertModal({
          alertModalContent: GuideText.FILL_ALL_FORM,
        }),
      );
      return;
    }

    createIdeaMutation.mutate(
      {
        title,
        content,
        hashtags: hashtagArr?.reduce<string[]>(
          (acc: Partial<string>[], cur: Hashtag) => [...acc, cur.content],
          [],
        ),
      },
      {
        onSuccess: () => {
          hideModal();
        },
      },
    );
  };

  return (
    <div className={styles.IdeaPage}>
      <Modal
        closeModal={hideModal}
        headerText="아이디어 제안하기"
        footer={{
          submitButton: (
            <Button primary onClick={handleCreateIdea}>
              확인
            </Button>
          ),
        }}
        zIndex={10}
        isWide
        isVisible={isModalVisible}
      >
        <div className={styles.IdeaModalInner}>
          <div className={styles.titleArea}>
            <Input ref={titleRef} placeholder="제목을 입력해주세요." maxWidth />
          </div>
          <div className={styles.contentArea}>
            <Textarea
              ref={contentRef}
              placeholder="내용을 입력해주세요."
              maxWidth
            />
          </div>
          <div className={styles.hashtagArea}>
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
          </div>
        </div>
      </Modal>
      <Button
        className={styles.scrollTopButton}
        variant="floating"
        iconName="expand_less"
      />
      <Button
        className={styles.createSideButton}
        onClick={showModal}
        variant="floating"
        iconName="add"
      />
    </div>
  );
};

export default IdeaPage;
