import React from 'react';
import cn from 'classnames';
import Typography from '@src/components/common/Typography';
import Button from '@src/components/common/Button';

import styles from './Sidebar.module.scss';

export const Sidebar = () => {
  return (
    <div className={cn(styles.Sidebar)}>
      <div className={styles.tabContainer}>
        <div className={styles.upperArea}>
          <div className={styles.tabButton}>
            <div className={styles.circle}></div>
            <Button variant="text">
              <Typography fontSize="md" fontWeight="bold" textColor="black">
                사이드
              </Typography>
            </Button>
          </div>
          <div className={styles.tabButton}>
            <div className={styles.circle}></div>
            <Button variant="text">
              <Typography fontSize="md" fontWeight="bold" textColor="black">
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
