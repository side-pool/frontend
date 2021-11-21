import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import styles from './SidePage.module.scss';
import Search from '@src/assets/Search.svg';
import Setting from '@src/assets/Setting.svg';
import Sort from '@src/assets/Sort.svg';

import Button from '@src/components/common/Button';
import AlertModal from '@src/components/modals/AlertModal';

import useModalControl from '@src/hooks/useModalControl';
import SideGithubModal from '@src/components/modals/SideGithubModal';

import SideList from '@src/components/SideList';
import {
  useGetCategory,
  useGetOrganization,
  useGetSkills,
} from '@src/hooks/useDropdownQuery';
import Dropdown, { ListsEachObject } from '@src/components/Dropdown';
import Typography from '@src/components/common/Typography';
import { setSide, useAppDispatch, useSideState } from '@src/store';
import Input, { ParentRef } from '@src/components/common/Input';
import { useAuth } from '@src/hooks/useUserQuery';

interface SidePageProps {
  handleToTop?: () => void;
}

const SidePage = ({ handleToTop }: SidePageProps) => {
  // 첫 화면 렌더링시 애니메이션 실행 안되도록 처리함
  const [init, setInit] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { isRecruiting, sort } = useSideState();

  const wrapperRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef({} as ParentRef);

  const {
    isModalVisible: isAlertVisible,
    modalMessage: alertMessage,
    showModal: showAlert,
    hideModal: hideAlert,
  } = useModalControl();

  const {
    isModalVisible: isGithubVisible,
    showModal: showGithubModal,
    hideModal: hideGithubModal,
  } = useModalControl();
  const { data: isAuth } = useAuth();

  const { data: categoryData } = useGetCategory();
  const { data: organizationData } = useGetOrganization();
  const { data: skillsData } = useGetSkills();

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () =>
      document.removeEventListener('click', handleClickOutside, true);
  }, []);

  const handleClickOutside = ({ target }: MouseEvent) => {
    if (!wrapperRef.current?.contains(target as HTMLDivElement)) {
      setIsFilterOpen(false);
    }
  };

  return (
    <div className={styles.SidePage}>
      <div className={styles.sideCardContainer}>
        <div
          className={cn(
            styles.sidePageTopArea,
            isGithubVisible && styles.isGithubVisible,
          )}
        >
          <Typography fontSize="xxl" fontWeight="bold">
            사이드
          </Typography>
          <div className={styles.searchArea}>
            <Setting
              className={styles.settingIcon}
              onClick={() => setIsFilterOpen((prev) => !prev)}
            />
            {isFilterOpen && (
              <div ref={wrapperRef} className={styles.sideFilter}>
                <Dropdown
                  lists={categoryData?.data as string[]}
                  title="category"
                />
                <Dropdown
                  lists={organizationData?.data as ListsEachObject[]}
                  title="organization"
                />
                <Dropdown
                  lists={skillsData?.data as ListsEachObject[]}
                  title="skill"
                />
                <label className={styles.teamAvailableCheckbox}>
                  <Typography fontSize="xs" lineHeight="wide" textColor="gray">
                    팀원 모집 중
                  </Typography>
                  <>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      onChange={() =>
                        dispatch(setSide({ isRecruiting: !isRecruiting }))
                      }
                    />
                    <span className={styles.teamAvailableCheckmark} />
                  </>
                </label>
              </div>
            )}
            <Search
              onClick={() => {
                searchRef.current.focus();
              }}
            />
            <Input
              ref={searchRef}
              className={cn(
                styles.sidePageSeachbar,
                init && styles.activeAnimation,
              )}
              placeholder="검색어를 입력해주세요"
              onChange={(e) =>
                dispatch(setSide({ search: e.target.value.split(' ') }))
              }
              onFocus={() => {
                setIsFilterOpen(false);
                setInit(true);
              }}
            />
          </div>
        </div>
        <div className={styles.filterArea}>
          <Sort />
          <Typography
            fontSize="xs"
            lineHeight="wide"
            textColor={sort?.includes('createdDate') ? 'blueActive' : 'gray'}
            onClick={() =>
              dispatch(
                setSide({
                  sort: `createdDate,${
                    sort?.includes('favoriteCount')
                      ? 'desc'
                      : sort?.includes('desc')
                      ? 'asc'
                      : 'desc'
                  }`,
                }),
              )
            }
          >
            최신순
          </Typography>
          <div className="seperator">|</div>
          <Typography
            fontSize="xs"
            lineHeight="wide"
            textColor={sort?.includes('favoriteCount') ? 'blueActive' : 'gray'}
            onClick={() =>
              dispatch(
                setSide({
                  sort: `favoriteCount,${
                    sort?.includes('createdDate')
                      ? 'desc'
                      : sort?.includes('desc')
                      ? 'asc'
                      : 'desc'
                  }`,
                }),
              )
            }
          >
            좋아요순
          </Typography>
        </div>
        <SideList />
      </div>

      <Button
        className={cn(styles.scrollTopButton, !isAuth && styles.changePosition)}
        variant="floating"
        iconName="expand_less"
        onClick={handleToTop}
      />
      {isAuth && (
        <Button
          className={styles.createSideButton}
          onClick={() => showGithubModal()}
          variant="floating"
          iconName="add"
        />
      )}
      {isGithubVisible && (
        <SideGithubModal hideModal={hideGithubModal} showAlert={showAlert} />
      )}
      {isAlertVisible && (
        <AlertModal content={alertMessage} handleConfirm={hideAlert} />
      )}
    </div>
  );
};

export default SidePage;
