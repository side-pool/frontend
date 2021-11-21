import React, { useMemo } from 'react';
import cn from 'classnames';
import { useHistory } from 'react-router-dom';
import SideColorIcon from '@src/assets/SideColor.svg';
import SideMonoIcon from '@src/assets/SideMono.svg';
import IdeaColorIcon from '@src/assets/IdeaColor.svg';
import IdeaMonoIcon from '@src/assets/IdeaMono.svg';
import Typography from '@src/components/common/Typography';
import Button from '@src/components/common/Button';
import styles from './MobileSidebar.module.scss';
import { useAppDispatch, showGlobalAlert } from '@src/store';

export interface MobileSidebarProps {
  className?: string;
  pathname: string;
}

export const MobileSidebar = ({
  className,
  pathname = '',
}: MobileSidebarProps) => {
  const distpatch = useAppDispatch();
  const history = useHistory();

  const isSide = useMemo(() => pathname.includes('side'), [pathname]);
  const isIdea = useMemo(() => pathname.includes('idea'), [pathname]);
  const isMypage = useMemo(() => pathname.includes('mypage'), [pathname]);

  return (
    <div className={cn(styles.MobileSidebar, className)}>
      <div className={styles.tabContainer}>
        <div className={styles.tabButton}>
          <Button variant="text" onClick={() => history.push('/side')}>
            {isSide ? <SideColorIcon /> : <SideMonoIcon />}
            <Typography fontSize="xs" textColor={isSide ? 'black' : 'gray'}>
              사이드
            </Typography>
          </Button>
        </div>
        <div className={styles.tabButton}>
          <Button variant="text" onClick={() => history.push('/idea')}>
            {isIdea ? <IdeaColorIcon /> : <IdeaMonoIcon />}
            <Typography fontSize="xs" textColor={isIdea ? 'black' : 'gray'}>
              아이디어
            </Typography>
          </Button>
        </div>
        <div className={styles.tabButton}>
          <Button
            variant="text"
            onClick={() =>
              distpatch(
                showGlobalAlert({
                  globalAlertMessage:
                    '모바일 환경에서는 마이페이지 확인이 불가합니다.',
                }),
              )
            }
          >
            {isMypage ? <IdeaColorIcon /> : <IdeaMonoIcon />}
            <Typography fontSize="xs" textColor={isIdea ? 'black' : 'gray'}>
              마이페이지
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
