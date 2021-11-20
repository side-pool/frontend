import React, { useState, useMemo, useRef, useLayoutEffect } from 'react';
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
import useThrottle from '@src/hooks/useThrottle';

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
  const dispatch = useAppDispatch();
  const { search } = useIdeaState();

  const hasthagWidthRef = useRef();

  const [isMore, setIsMore] = useState(false);
  const [isMoreHashtag, setIsMoreHastag] = useState(true);
  const [restHashtagLength, setRestHashtagLength] = useState(0);

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

  const calcIsMorePointer = useThrottle(
    () =>
      setRestHashtagLength(
        idea.hashtags.reduce(
          (acc, cur) => {
            const calcWdith = acc.width + 50 + cur.length * 4;

            if (calcWdith < hasthagWidthRef?.current?.offsetWidth) {
              return {
                width: calcWdith,
                pointer: acc.pointer + 1,
              };
            }
            return { ...acc };
          },
          {
            pointer: 0,
            width: 0,
          },
        ).pointer,
      ),
    100,
  );

  useLayoutEffect(() => {
    window.addEventListener('resize', calcIsMorePointer);

    calcIsMorePointer();
    return () => window.removeEventListener('resize', calcIsMorePointer);
  }, []);

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
      <div className={styles.labelArea} ref={hasthagWidthRef}>
        {idea.hashtags
          .slice(0, isMoreHashtag ? restHashtagLength : idea.hashtags.length)
          .map((tag, index) => (
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
        {restHashtagLength !== idea.hashtags.length && (
          <Button
            variant="text"
            onClick={() => setIsMoreHastag((prev) => !prev)}
          >
            {isMoreHashtag ? '더보기' : '접기'}
          </Button>
        )}
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
          handleCancel={hideDeleteConfirmAlert}
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
