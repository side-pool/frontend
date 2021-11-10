import React, { useState, useEffect, useRef } from 'react';
import cn from 'classnames';
import styles from './SideCommentDropdown.module.scss';
import DropdownOnlyList from '@src/components/SideCommentDropdown/DropdownOnlyLists';
import Icon from '@src/components/common/Icon';
import Typography from '../common/Typography';
import { useSideState } from '@src/store';

export type ListsEachObject = {
  name: string;
  id: string;
};

export interface SideCommentDropdownEach {
  name: string;
  id: string;
  checked: boolean;
}

export const COMMENT_DROPDOWN = [
  '칭찬',
  '버그 제보',
  '개발 피드백',
  '디자인 피드백',
  '기획 피드백',
  '팀 빌딩 관련',
];

const SideCommentDropdown = () => {
  const { commentTag } = useSideState();
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () =>
      document.removeEventListener('click', handleClickOutside, true);
  }, []);

  const handleClickOutside = ({ target }: MouseEvent) => {
    if (!wrapperRef.current?.contains(target as HTMLDivElement)) {
      setOpen(false);
    }
  };

  return (
    <div className={styles.SideCommentDropdown} ref={wrapperRef}>
      <div
        className={cn(
          styles.DropdownButton,
          open ? styles.open : styles.close,
          styles[COMMENT_DROPDOWN[commentTag || 0].replaceAll(' ', '')],
        )}
        onClick={() => setOpen(!open)}
        aria-hidden="true"
      >
        <Typography fontSize="xs" lineHeight="wider" textColor="gray">
          {COMMENT_DROPDOWN[commentTag || 0]}
        </Typography>
        <Icon iconName="arrow_drop_down" color="#C4C4C4" pointer />
      </div>
      {open && <DropdownOnlyList dropdwonLists={COMMENT_DROPDOWN} />}
    </div>
  );
};

export default SideCommentDropdown;
