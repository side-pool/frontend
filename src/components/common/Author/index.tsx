import React from 'react';
import Typography from '@src/components/common/Typography';
import ProfileIcon from '@src/assets/IdeaProfile.svg';
import styles from './Author.module.scss';

export interface AuthorProps {
  nickname: string;
}

const Author = ({ nickname }: AuthorProps) => {
  return (
    <div className={styles.Author}>
      <ProfileIcon />
      <Typography fontSize="xs">{nickname}</Typography>
    </div>
  );
};

export default Author;
