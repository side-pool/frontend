import React, { useState } from 'react';

import styles from './SidePage.module.scss';
import Search from '@src/assets/Search.svg';
import Setting from '@src/assets/Setting.svg';
import Sort from '@src/assets/Sort.svg';

import Button from '@src/components/common/Button';
import AlertModal from '@src/components/modals/AlertModal';

import useModalControl from '@src/hooks/useModalControl';
import IdeaFormModal from '@src/components/modals/IdeaFormModal';

import SideList from '@src/components/SideList';
import {
  useGetCategory,
  useGetOrganization,
  useGetSkills,
} from '@src/hooks/useDropdownQuery';
import Dropdown, { ListsEachObject } from '@src/components/Dropdown';
import Typography from '@src/components/common/Typography';
import { setSide, useAppDispatch, useSideState } from '@src/store';
import Input from '@src/components/common/Input';

interface SidePageProps {
  handleToTop?: () => void;
}

const SidePage = ({ handleToTop }: SidePageProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { isRecruiting, sort } = useSideState();
  const {
    isModalVisible: isAlertVisible,
    modalMessage: alertMessage,
    showModal: showAlert,
    hideModal: hideAlert,
  } = useModalControl();

  const {
    isModalVisible: isIdeaFormVisible,
    showModal: showIdeaForm,
    hideModal: hideIdeaForm,
  } = useModalControl();

  const { data: categoryData } = useGetCategory();
  const { data: organizationData } = useGetOrganization();
  const { data: skillsData } = useGetSkills();

  return (
    <div className={styles.SidePage}>
      <div className={styles.sideCardContainer}>
        <div className={styles.topArea}>
          <Typography fontSize="xxl" fontWeight="bold">
            사이드
          </Typography>
          <div className={styles.searchArea}>
            <div className={styles.icons}>
              <Search />
              <Setting onClick={() => setIsFilterOpen((prev) => !prev)} />
            </div>
            {isFilterOpen && (
              <>
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
              </>
            )}
            <Input
              placeholder="검색어를 입력해주세요"
              onChange={(e) =>
                dispatch(setSide({ search: e.target.value.split(' ') }))
              }
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
                      ? 'asc'
                      : sort?.includes('asc')
                      ? 'desc'
                      : 'asc'
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
                      ? 'asc'
                      : sort?.includes('asc')
                      ? 'desc'
                      : 'asc'
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
        className={styles.scrollTopButton}
        variant="floating"
        iconName="expand_less"
        onClick={handleToTop}
      />
      <Button
        className={styles.createSideButton}
        onClick={() => showIdeaForm()}
        variant="floating"
        iconName="add"
      />
      {isIdeaFormVisible && (
        <IdeaFormModal
          hideIdeaForm={hideIdeaForm}
          showAlert={showAlert}
          isCreate
        />
      )}
      {isAlertVisible && (
        <AlertModal content={alertMessage} handleConfirm={hideAlert} />
      )}
    </div>
  );
};

export default SidePage;
