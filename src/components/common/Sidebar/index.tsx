import React, { useMemo } from 'react';
import cn from 'classnames';
import { useHistory } from 'react-router-dom';
import SideColorIcon from '@src/assets/SideColor.svg';
import SideMonoIcon from '@src/assets/SideMono.svg';
import IdeaColorIcon from '@src/assets/IdeaColor.svg';
import IdeaMonoIcon from '@src/assets/IdeaMono.svg';
import Typography from '@src/components/common/Typography';
import Button from '@src/components/common/Button';
import styles from './Sidebar.module.scss';
import { useAuth } from '@src/hooks/useUserQuery';
import { useLogout } from '@src/hooks/useAuthQuery';
import { useReadAlarm } from '@src/hooks/useMyPageQuery';
export interface SidebarProps {
  className?: string;
  pathname: string;
}

export const Sidebar = ({ className, pathname = '' }: SidebarProps) => {
  const history = useHistory();

  const { data: isAuth } = useAuth();

  const { data } = useReadAlarm(isAuth ?? false);

  const isNotificationExist = useMemo(
    () => data?.some(({ read }) => !read),
    [data],
  );

  const [logout] = useLogout(() => {
    history.push('/idea');
  });

  const isSide = useMemo(() => pathname.includes('side'), [pathname]);
  const isIdea = useMemo(() => pathname.includes('idea'), [pathname]);

  return (
    <div className={cn(styles.Sidebar, className)}>
      <div className={styles.tabContainer}>
        <div className={styles.upperArea}>
          <div className={styles.tabButton}>
            <Button variant="text" onClick={() => history.push('/side')}>
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
            <Button variant="text" onClick={() => history.push('/idea')}>
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
          {isAuth && (
            <div className={styles.authButton}>
              <Button
                variant="text"
                onClick={() => {
                  history.push('/mypage');
                }}
              >
                <Typography
                  fontSize="sm"
                  fontWeight="regular"
                  textColor="black"
                >
                  마이페이지
                </Typography>
                {isNotificationExist && (
                  <div className={styles.isNotificationExist} />
                )}
              </Button>
              <Button
                variant="text"
                onClick={() => {
                  logout();
                }}
              >
                <Typography
                  fontSize="sm"
                  fontWeight="regular"
                  textColor="black"
                >
                  로그아웃
                </Typography>
              </Button>
            </div>
          )}
          {!isAuth && (
            <div className={styles.authButton}>
              <Button
                variant="text"
                onClick={() => {
                  history.push('/login');
                }}
              >
                <Typography
                  fontSize="sm"
                  fontWeight="regular"
                  textColor="black"
                >
                  로그인
                </Typography>
              </Button>
              <Button variant="text">
                <Typography
                  fontSize="sm"
                  fontWeight="regular"
                  textColor="black"
                  onClick={() => {
                    history.push('/join');
                  }}
                >
                  회원가입
                </Typography>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
