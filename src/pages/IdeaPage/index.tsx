import React, { useState } from 'react';
import cn from 'classnames';
import styles from './IdeaPage.module.scss';
import Search from '@src/assets/Search.svg';
import Setting from '@src/assets/Setting.svg';
import Sort from '@src/assets/Sort.svg';

import Button from '@src/components/common/Button';
import AlertModal from '@src/components/modals/AlertModal';
import useModalControl from '@src/hooks/useModalControl';
import IdeaFormModal from '@src/components/modals/IdeaFormModal';
import IdeaCardContainer from '@src/components/Idea/IdeaCardContainer';
import { useAuth } from '@src/hooks/useUserQuery';
import Typography from '@src/components/common/Typography';
import { setIdea, useAppDispatch, useIdeaState } from '@src/store';
import Input from '@src/components/common/Input';

interface IdeaPageProps {
  handleToTop?: () => void;
}

const IdeaPage = ({ handleToTop }: IdeaPageProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { isDone, sort } = useIdeaState();
  const dispatch = useAppDispatch();
  const { data: isAuth } = useAuth();

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

  return (
    <div className={styles.IdeaPage}>
      <div className={styles.ideaCardContainer}>
        <div className={styles.topArea}>
          <Typography fontSize="xxl" fontWeight="bold">
            아이디어
          </Typography>
          <div className={styles.searchArea}>
            <div className={styles.icons}>
              <Search />
              <Setting onClick={() => setIsFilterOpen((prev) => !prev)} />
            </div>
            {isFilterOpen && (
              <>
                <label className={styles.isDoneCheckbox}>
                  <Typography fontSize="xs" lineHeight="wide" textColor="gray">
                    해결되었어요
                  </Typography>
                  <>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      onChange={() => dispatch(setIdea({ isDone: !isDone }))}
                    />
                    <span className={styles.isDoneCheckmark} />
                  </>
                </label>
              </>
            )}
            <Input
              placeholder="검색어를 입력해주세요"
              onChange={(e) =>
                dispatch(setIdea({ search: e.target.value.split(' ') }))
              }
            />
          </div>
        </div>
        <div className={styles.banner} />

        <div className={styles.filterArea}>
          <Sort />
          <Typography
            fontSize="xs"
            lineHeight="wide"
            textColor={sort?.includes('createdDate') ? 'blueActive' : 'gray'}
            onClick={() =>
              dispatch(
                setIdea({
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
                setIdea({
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
      </div>
      <IdeaCardContainer />
      <Button
        className={cn(styles.scrollTopButton, !isAuth && styles.changePosition)}
        variant="floating"
        iconName="expand_less"
        onClick={handleToTop}
      />
      {isAuth && (
        <>
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
        </>
      )}
    </div>
  );
};

export default IdeaPage;
