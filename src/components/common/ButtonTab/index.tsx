import React from 'react';
import Button from '@src/components/common/Button';
import Typography from '@src/components/common/Typography';
import styles from './ButtonTab.module.scss';
import CommentIcon from '@src/assets/Comment.svg';
import SimilarIcon from '@src/assets/WarningCircle.svg';
import cn from 'classnames';

export interface ButtonTabProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string;
  active?: boolean;
  text?: string;
}

const ButtonTab = ({
  className,
  active,
  text,
  children,
  ...props
}: ButtonTabProps) => {
  return (
    <Button
      className={cn(styles.ButtonTab, active && styles.active)}
      variant="text"
      {...props}
    >
      <div className={styles.tabContent}>
        {children}
        <Typography className={className} fontSize="sm">
          {text}
        </Typography>
      </div>
    </Button>
  );
};

// text props는 css content로 대체(모바일 대응을 위함)
export const CommentTab = ({ ...props }: Partial<ButtonTabProps>) => (
  <ButtonTab className={styles.commentTab} {...props}>
    <CommentIcon />
  </ButtonTab>
);

export const SimilarServiceTab = ({ ...props }: Partial<ButtonTabProps>) => (
  <ButtonTab className={styles.similarServiceTab} {...props}>
    <SimilarIcon />
  </ButtonTab>
);
