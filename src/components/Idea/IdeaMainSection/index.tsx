import React, { useState, useMemo } from 'react';
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
import {
  setIdea,
  useAppDispatch,
  useIdeaState,
  showGlobalAlert,
} from '@src/store';

interface IdeaMainSectionProps {
  idea: Idea;
}

interface IsDoneTagProps {
  isDone: boolean;
}

const IsDoneTag = ({ isDone }: IsDoneTagProps) =>
  isDone ? (
    <LabelTag wrapperColor="orange" textColor="white" className="isDoneTag">
      해결되었어요
    </LabelTag>
  ) : (
    <LabelTag wrapperColor="beige" textColor="orange" className="isDoneTag">
      제안해요
    </LabelTag>
  );

const IdeaMainSection = ({ idea }: IdeaMainSectionProps) => {
  const dispatch = useAppDispatch();
  const { search } = useIdeaState();

  const [isMore, setIsMore] = useState(false);
  const {
    isModalVisible: isAlertVisible,
    modalMessage: alertMessage,
    showModal: showAlert,
    hideModal: hideAlert,
  } = useModalControl();

  const {
    isModalVisible: isDeleteConfirmAlertVisible,
    showModal: showDeleteConfirmAlert,
    hideModal: hideDeleteConfirmAlert,
  } = useModalControl();

  const {
    isModalVisible: isIdeaFormVisible,
    showModal: showIdeaForm,
    hideModal: hideIdeaForm,
  } = useModalControl();

  const isMySide = useIsMySide(idea?.author?.id ?? 0);

  const deleteIdeaMutation = useDeleteIdea();

  const content = useMemo(() => idea.content.split('\n'), [idea]);

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
              <Button
                variant="text"
                labelText="수정"
                onClick={() => showIdeaForm()}
              />
              <Button
                variant="text"
                labelText="삭제"
                onClick={() => showDeleteConfirmAlert()}
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
        {isMore ? content.join('\n') : content.slice(0, 5).join('\n')}
      </Typography>
      {content.length > 5 && (
        <Button
          variant="text"
          labelText={isMore ? '접기' : '더보기'}
          className={styles.moreButton}
          onClick={() => setIsMore((prev) => !prev)}
        />
      )}
      <div className={styles.labelArea}>
        {idea.hashtags.map((tag, index) => (
          <HashTag
            key={index}
            onClick={() =>
              dispatch(
                setIdea({
                  search: search.includes(tag)
                    ? search.filter((each) => tag !== each)
                    : [...search, tag],
                }),
              )
            }
          >{`# ${tag}`}</HashTag>
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
      {isDeleteConfirmAlertVisible && (
        <AlertModal
          content="삭제하시겠습니까?"
          handleConfirm={() => {
            hideDeleteConfirmAlert();
            deleteIdeaMutation.mutate(String(idea.id), {
              onSuccess: () =>
                dispatch(
                  showGlobalAlert({
                    globalAlertMessage: GuideText.DELETE_SUCCESS,
                  }),
                ),
              onError: () => showAlert(GuideText.ERROR),
            });
          }}
        />
      )}
    </section>
  );
};

export default IdeaMainSection;
