import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { loadItem, ACCESS_TOKEN } from '@src/utils/storage';
import Typography from '@src/components/common/Typography';
import Button from '@src/components/common/Button';
import styles from './Sidebar.module.scss';
import { useHistory } from 'react-router';

export interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const [isLogin, setIsLogin] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (loadItem(ACCESS_TOKEN) === null) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, []);

  return (
    <div className={cn(styles.Sidebar, className)}>
      <div className={styles.tabContainer}>
        <div className={styles.upperArea}>
          <div className={styles.tabButton}>
            <div className={styles.circle}></div>
            <Button variant="text">
              <Typography fontSize="md" fontWeight="bold" textColor="gray">
                사이드
              </Typography>
            </Button>
          </div>
          <div className={styles.tabButton}>
            <div className={styles.circle}></div>
            <Button variant="text">
              <Typography fontSize="md" fontWeight="bold" textColor="gray">
                아이디어
              </Typography>
            </Button>
          </div>
        </div>
        <div className={styles.downArea}>
          {!isLogin && (
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
