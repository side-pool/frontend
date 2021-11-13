import React from 'react';
import styles from './IdeaBottomSection.module.scss';
import { UserTab } from '@src/constant/enums';
import IdeaCommentForm from '@src/components/Idea/IdeaComment/IdeaCommentForm';
import SimilarFormContainer from '@src/components/Idea/SimilarService/SimilarFormContainer';
import { useReadIdeaComments } from '@src/hooks/useIdeaCommentQuery';
import { useAuth } from '@src/hooks/useUserQuery';
import IdeaCommentBoxContainer from '@src/components/Idea/IdeaComment/IdeaCommentBoxContainer';
import ForbiddenComment from '@src/components/Comment/ForbiddenComment';
import { useReadSimilars } from '@src/hooks/useSimilarQuery';
import SimilarBoxContainer from '@src/components/Idea/SimilarService/SimilarBoxContainer';

type UserTabValue = typeof UserTab[keyof typeof UserTab];

interface IdeaBottomSectionProps {
  tabToggle: UserTabValue;
  ideaId: number;
}

const IdeaBottomSection = ({ tabToggle, ideaId }: IdeaBottomSectionProps) => {
  const { data: comments, isSuccess: isCommentSuccess } =
    useReadIdeaComments(ideaId);
  const { data: similarArr, isSuccess: isSimilarSuccess } =
    useReadSimilars(ideaId);
  const { data: isAuth } = useAuth();

  return (
    <section className={styles.IdeaBottomSection}>
      {tabToggle === UserTab.COMMENT && (
        <>
          <IdeaCommentForm ideaId={ideaId} />
          {isCommentSuccess &&
            comments?.map((comment) => (
              <IdeaCommentBoxContainer
                key={comment.id}
                ideaId={ideaId}
                comment={comment}
              />
            ))}
          {!isAuth && comments?.length === 0 && <ForbiddenComment />}
        </>
      )}
      {tabToggle === UserTab.SIMILAR_SERVICE && (
        <>
          <SimilarFormContainer ideaId={ideaId} />
          {isSimilarSuccess &&
            similarArr?.map((similar) => (
              <SimilarBoxContainer
                key={similar.id}
                ideaId={ideaId}
                similar={similar}
              />
            ))}
          {!isAuth && similarArr?.length === 0 && (
            <ForbiddenComment
              content={'로그인 후 비슷한 서비스를 등록해주세요'}
            />
          )}
        </>
      )}
    </section>
  );
};

export default IdeaBottomSection;
