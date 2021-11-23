import React, { useState, useRef, useMemo } from 'react';
import cn from 'classnames';
import styles from './Gnb.module.scss';
import useScrollPosition from '@src/hooks/useScrollPosition';
import Typography from '@src/components/common/Typography';
import SearchMini from '@src/assets/SearchMini.svg';
import Create from '@src/assets/Create.svg';

import Input, { ParentRef } from '@src/components/common/Input';
import {
  setSide,
  useAppDispatch,
  useSideState,
  useIdeaState,
  setIdea,
} from '@src/store';
import { useAuth } from '@src/hooks/useUserQuery';

interface GnbProps {
  pathname: string;
  showGithubModal: () => void;
}

const Gnb = ({ pathname, showGithubModal }: GnbProps) => {
  const { search: sideSearch } = useSideState();
  const { search: ideaSearch } = useIdeaState();
  const { data: isAuth } = useAuth();

  const dispatch = useAppDispatch();
  const { isActive } = useScrollPosition();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const wrapperRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef({} as ParentRef);

  const isSide = useMemo(() => pathname.includes('side'), [pathname]);
  return (
    <div
      ref={wrapperRef}
      className={cn(styles.Gnb, isActive && styles.isActiveGnb)}
    >
      {isSearchOpen ? (
        <Input
          ref={searchRef}
          className={cn(
            styles.gnbSearchbar,
            isSearchOpen && styles.activeAnimation,
          )}
          placeholder="검색어를 입력해주세요"
          onChange={(e) =>
            dispatch(
              isSide
                ? setSide({
                    search:
                      e.target.value.length > 0
                        ? e.target.value.split(' ')
                        : [],
                  })
                : setIdea({
                    search:
                      e.target.value.length > 0
                        ? e.target.value.split(' ')
                        : [],
                  }),
            )
          }
          onBlur={() => {
            setIsSearchOpen(false);
          }}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          value={(isSide ? sideSearch : ideaSearch)?.join(' ')}
        />
      ) : (
        <Typography fontSize="xhl" fontWeight="bold">
          {isSide ? '사이드' : '아이디어'}
        </Typography>
      )}

      <div className={styles.gnbIconContainer}>
        {isAuth && !isSearchOpen && (
          <Create onClick={() => showGithubModal()} />
        )}
        <SearchMini
          onClick={() => {
            setIsSearchOpen(true);
          }}
        />
      </div>
    </div>
  );
};

export default Gnb;
