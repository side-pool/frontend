import React, { useEffect, useRef, useState } from 'react';
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
import { setIdea, setInitIdea, useAppDispatch, useIdeaState } from '@src/store';
import Input, { ParentRef } from '@src/components/common/Input';
import { useQueryClient } from 'react-query';
import HashTagBanner from '@src/components/HashTagBanner';
import { useGetHashTags } from '@src/hooks/useHashTagQuery';

const IDEA_URL = '/ideas';

interface IdeaPageProps {
  handleToTop?: () => void;
}

const IdeaPage = ({ handleToTop }: IdeaPageProps) => {
  const { search } = useIdeaState();

  // 첫 화면 렌더링시 애니메이션 실행 안되도록 처리함
  const [init, setInit] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const queryClient = useQueryClient();
  const { isDone, sort } = useIdeaState();
  const dispatch = useAppDispatch();
  const { data: isAuth } = useAuth();
  const { data: hashTagInfos, isSuccess: isHashTagSuccess } = useGetHashTags();

  const wrapperRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef({} as ParentRef);

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

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      dispatch(setInitIdea());
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const handleClickOutside = ({ target }: MouseEvent) => {
    if (!wrapperRef.current?.contains(target as HTMLDivElement)) {
      setIsFilterOpen(false);
    }
  };

  return (
    <div className={styles.IdeaPage}>
      <div className={styles.ideaCardContainer}>
        <div className={styles.topArea}>
          <Typography fontSize="xxl" fontWeight="bold">
            아이디어
          </Typography>
          <div className={styles.searchArea}>
            <Setting onClick={() => setIsFilterOpen((prev) => !prev)} />
            {isFilterOpen && (
              <div ref={wrapperRef}>
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
                styles.ideaPageSeachbar,
                init && styles.activeAnimation,
              )}
              placeholder="검색어를 입력해주세요"
              onChange={(e) =>
                dispatch(
                  setIdea({
                    search:
                      e.target.value.length > 0
                        ? e.target.value.split(' ')
                        : [],
                  }),
                )
              }
              value={search?.join(' ')}
              onFocus={() => {
                setIsFilterOpen(false);
                setInit(true);
              }}
            />
          </div>
        </div>
        {isHashTagSuccess && (
          <HashTagBanner hashTagInfos={hashTagInfos ?? []} />
        )}
        <div className={styles.filterArea}>
          <div className={styles.filter}>
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
              textColor={
                sort?.includes('favoriteCount') ? 'blueActive' : 'gray'
              }
              onClick={() =>
                dispatch(
                  setIdea({
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
            className={styles.createIdeaButton}
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
            <AlertModal
              content={alertMessage}
              handleConfirm={() => {
                hideAlert();
                queryClient.invalidateQueries(IDEA_URL);
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default IdeaPage;
