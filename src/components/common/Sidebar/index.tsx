import React, { useMemo } from 'react';
import cn from 'classnames';

import { useHistory } from 'react-router-dom';

import SideColorIcon from '@src/assets/side_color.svg';
import SideMonoIcon from '@src/assets/side_mono.svg';
import IdeaColorIcon from '@src/assets/idea_color.svg';
import IdeaMonoIcon from '@src/assets/idea_mono.svg';

import Typography from '@src/components/common/Typography';
import Button from '@src/components/common/Button';

import styles from './Sidebar.module.scss';

export interface SidebarProps {
  className?: string;
  pathname: string;
}

export const Sidebar = ({ className, pathname }: SidebarProps) => {
  const history = useHistory();
  const isSide = useMemo(() => pathname.includes('side'), [pathname]);
  const isIdea = useMemo(() => pathname.includes('idea'), [pathname]);

  return (
    <div className={cn(styles.Sidebar, className)}>
      <div className={styles.tabContainer}>
        <div className={styles.upperArea}>
          <div className={styles.tabButton}>
            <Button variant="text" onClick={() => history.push('side')}>
              {isSide ? <SideColorIcon /> : <SideMonoIcon />}
              <Typography
                fontSize="md"
                fontWeight="bold"
                textColor={isSide ? 'black' : 'gray'}
              >
                사이드
              </Typography>
            </Button>
          </div>
          <div className={styles.tabButton}>
            <Button variant="text" onClick={() => history.push('idea')}>
              {isIdea ? <IdeaColorIcon /> : <IdeaMonoIcon />}
              <Typography
                fontSize="md"
                fontWeight="bold"
                textColor={isIdea ? 'black' : 'gray'}
              >
                아이디어
              </Typography>
            </Button>
          </div>
        </div>
        <div className={styles.downArea}>
          <div className={styles.authButton}>
            <Button variant="text">
              <Typography fontSize="sm" fontWeight="regular" textColor="black">
                로그인
              </Typography>
            </Button>
            <Button variant="text">
              <Typography fontSize="sm" fontWeight="regular" textColor="black">
                회원가입
              </Typography>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
