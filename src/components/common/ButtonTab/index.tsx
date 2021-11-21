import React from 'react';
import Button from '@src/components/common/Button';
import Typography from '@src/components/common/Typography';
import styles from './ButtonTab.module.scss';
import CommentIcon from '@src/assets/Comment.svg';
import SimilarIcon from '@src/assets/WarningCircle.svg';
import cn from 'classnames';
import useWindowSize from '@src/hooks/useWindowSize';

export interface ButtonTabProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  text: string;
}

const ButtonTab = ({ active, text, children, ...props }: ButtonTabProps) => {
  return (
    <Button
      className={cn(styles.ButtonTab, active && styles.active)}
      variant="text"
      {...props}
    >
      <div className={styles.tabContent}>
        {children}
        <Typography fontSize="sm">{text}</Typography>
      </div>
    </Button>
  );
};

export const CommentTab = ({ ...props }: Partial<ButtonTabProps>) => {
  const { isMobile } = useWindowSize();

  return (
    <ButtonTab text={isMobile ? '댓글' : '댓글보기'} {...props}>
      <CommentIcon />
    </ButtonTab>
  );
};

export const SimilarServiceTab = ({ ...props }: Partial<ButtonTabProps>) => {
  const { isMobile } = useWindowSize();

  return (
    <ButtonTab
      text={isMobile ? '비슷한 서비스' : '비슷한 서비스가 있어요'}
      {...props}
    >
      <SimilarIcon />
    </ButtonTab>
  );
};
