import React from 'react';
import styles from './SideBottomSection.module.scss';
import ForbiddenComment from '@src/components/Comment/ForbiddenComment';
import SideCommentBoxContainer from '@src/components/SideComment/SideCommentBoxContainer';
import SideCommentForm from '@src/components/SideComment/SideCommentForm';
import { useAuth } from '@src/hooks/useUserQuery';
import { useReadSideComments } from '@src/hooks/useSideCommentQuery';

interface SideBottomSectionProps {
  sideId: number;
}

const SideBottomSection = ({ sideId }: SideBottomSectionProps) => {
  const { data: comments, isSuccess: isCommentSuccess } =
    useReadSideComments(sideId);
  const { data: isAuth } = useAuth();

  return (
    <section className={styles.SideBottomSection}>
      <SideCommentForm sideId={sideId} />
      {isCommentSuccess &&
        comments?.map((comment) => (
          <SideCommentBoxContainer
            key={comment.id}
            sideId={sideId}
            comment={comment}
          />
        ))}
      {!isAuth && comments?.length === 0 && <ForbiddenComment />}
    </section>
  );
};

export default SideBottomSection;
