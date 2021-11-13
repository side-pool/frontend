import React from 'react';
import Button from '@src/components/common/Button';
import LabelTag, { HashTag } from '@src/components/common/LabelTag';
import Typography from '@src/components/common/Typography';
import Author from '@src/components/common/Author';
import { getDiffTime } from '@src/utils/common';
import { Idea } from '@src/models';
import styles from './IdeaMainSection.module.scss';
import { useDeleteIdea } from '@src/hooks/useIdeaQuery';
import useModalControl from '@src/hooks/useModalControl';
import IdeaFormModal from '@src/components/modals/IdeaFormModal';
import AlertModal from '@src/components/modals/AlertModal';
import { useIsMySide } from '@src/hooks/useSideQuery';
import { GuideText } from '@src/constant/enums';

interface IdeaMainSectionProps {
  idea: Idea;
}

interface IsDoneTagProps {
  isDone: boolean;
}

const IsDoneTag = ({ isDone }: IsDoneTagProps) =>
  isDone ? (
    <LabelTag wrapperColor="orange" textColor="white" className="isDoneTag">
      해결됐어요
    </LabelTag>
  ) : (
    <LabelTag wrapperColor="beige" textColor="orange" className="isDoneTag">
      제안해요
    </LabelTag>
  );

const IdeaMainSection = ({ idea }: IdeaMainSectionProps) => {
  const {
    isModalVisible: isAlertVisible,
    modalMessage: alertMessage,
    showModal: showAlert,
    hideModal: hideAlert,
  } = useModalControl();

  const {
    isModalVisible: isIdeaFormVisible,
    showModal: showIdeaForm,
    hideModal: hideIdeaForm,
  } = useModalControl();

  const isMySide = useIsMySide(idea?.author?.id ?? 0);

  const deleteIdeaMutation = useDeleteIdea();

  return (
    <section className={styles.IdeaMainSection}>
      <header>
        <Typography fontSize="md" fontWeight="medium">
          {idea.title}
        </Typography>
        <div className={styles.ideMainTopLeftArea}>
          <IsDoneTag isDone={idea.isDone} />
          {isMySide && (
            <div className={styles.ideaMaintopButtonContainer}>
              <Button variant="text" labelText="수정" onClick={showIdeaForm} />
              <Button
                variant="text"
                labelText="삭제"
                onClick={() =>
                  deleteIdeaMutation.mutate(idea.id, {
                    onSuccess: () => showAlert(GuideText.DELETE_SUCCESS),
                    onError: () => showAlert(GuideText.ERROR),
                  })
                }
              />
            </div>
          )}
        </div>
      </header>
      <div className={styles.subText}>
        <Author nickname={idea.author.nickname} />
        <Typography
          textColor="gray"
          fontSize="xxs"
          className={styles.writtenDate}
        >
          {getDiffTime({
            newDate: new Date(),
            oldDate: new Date(idea.updatedDate),
          })}
        </Typography>
      </div>
      <Typography fontSize="xs" className={styles.ideaBody}>
        {idea.content}
      </Typography>
      <Button
        // TODO: 본문 길이에 따라 hide
        variant="text"
        labelText="더보기"
        className={styles.moreButton}
      />
      <div className={styles.labelArea}>
        {idea.hashtags.map((tag, index) => (
          <HashTag key={index}>{`# ${tag}`}</HashTag>
        ))}
      </div>
      {isIdeaFormVisible && (
        <IdeaFormModal
          hideIdeaForm={hideIdeaForm}
          showAlert={showAlert}
          initialValue={{
            title: idea.title,
            content: idea.content,
            hashtags: idea.hashtags,
          }}
          id={idea.id}
        />
      )}
      {isAlertVisible && (
        <AlertModal
          content={alertMessage}
          handleConfirm={() => {
            hideAlert();
          }}
        />
      )}
    </section>
  );
};

export default IdeaMainSection;
