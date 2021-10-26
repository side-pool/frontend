import React, { useState, useRef } from 'react';
import styles from './IdeaPage.module.scss';
import IdeaList from '@src/components/IdeaList';
import Modal from '@src/components/common/Modal';
import Input, { ParentRef } from '@src/components/common/Input';
import Textarea, { TextareaParentRef } from '@src/components/common/Textarea';
import Button from '@src/components/common/Button';
import { useCreateIdea } from '@src/hooks/useIdeaQuery';

const IdeaPage = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);

  const titleRef = useRef({} as ParentRef);
  const contentRef = useRef({} as TextareaParentRef);
  const [hashtags, setHashtags] = useState<string[]>([]);

  const createIdeaMutation = useCreateIdea();

  const handleCreateIdea = () => {
    const title = titleRef.current.get() || '';
    const content = contentRef.current.get() || '';

    if (title.length < 1 || content.length < 1) {
      return alert('하나라도 입력해야 함');
    }

    createIdeaMutation.mutate(
      {
        title,
        content,
        hashtags,
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
      <IdeaList />
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
            <Input placeholder="#을 이용해 태그를 입력해보세요." maxWidth />
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
