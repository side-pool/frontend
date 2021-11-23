import React, { useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Viewer } from '@toast-ui/react-editor';
import cn from 'classnames';

import Github from '@src/assets/Github.svg';
import RightArrow from '@src/assets/RightArrow.svg';

import '@toast-ui/editor/dist/toastui-editor.css';

import styles from './SideReadPage.module.scss';

import Button from '@src/components/common/Button';
import AlertModal from '@src/components/modals/AlertModal';
import Typography from '@src/components/common/Typography';
import Textarea from '@src/components/common/Textarea';

import useModalControl from '@src/hooks/useModalControl';

import {
  useDeleteSide,
  useIsMySide,
  useReadSideDetail,
} from '@src/hooks/useSideQuery';
import {
  useReadContributors,
  useReadGithubInfo,
} from '@src/hooks/useGithubQuery';

import LabelTag from '@src/components/common/LabelTag';
import { GuideText } from '@src/constant/enums';
import SideMiddleSection from '@src/pages/SideReadPage/SideMiddleSection';
import SideBottomSection from '@src/pages/SideReadPage/SideBottomSection';
import { showGlobalAlert, useAppDispatch } from '@src/store';

interface SideReadProps {
  handleToTop?: () => void;
}

type ContributorsType = {
  id: number;
  html_url: string;
  avatar_url: string;
  login: string;
};

const SideReadPage = ({ handleToTop }: SideReadProps) => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const { id: paramId }: { id: string } = useParams();
  const id = Number(paramId);

  const { data } = useReadSideDetail(id);
  const { data: githubData } = useReadGithubInfo(
    data?.githubLink?.replace('https://github.com/', '') ?? '',
  );
  const { data: contributors } = useReadContributors(
    githubData?.contributors_url ?? '',
  );

  const isMySide = useIsMySide(data?.author?.id ?? 0);

  const deleteSideMutation = useDeleteSide();

  // TODO: 추후 타입 정의
  const editorRef = useRef<any>();

  const {
    isModalVisible: isAlertVisible,
    modalMessage: alertMessage,
    showModal: showAlert,
    hideModal: hideAlert,
  } = useModalControl();

  const handleDeleteSide = () => {
    deleteSideMutation.mutate(id, {
      onSuccess: () => {
        dispatch(
          showGlobalAlert({ globalAlertMessage: GuideText.DELETE_SUCCESS }),
        );
        history.push('/side');
      },
      onError: () => {
        showAlert(GuideText.ERROR);
      },
    });
  };

  const handleEditSide = () => {
    history.push(`/side/edit/${id}`);
  };

  if (paramId === 'create') {
    return null;
  }

  return (
    <div className={styles.SideReadPage}>
      <div className={styles.sideCardContainer}>
        {/* side main section */}
        <div className={styles.topArea}>
          <Typography fontSize="xxl" fontWeight="bold">
            사이드
          </Typography>
          {isMySide && (
            <div className={styles.buttonGroup}>
              <Button onClick={handleDeleteSide}>삭제</Button>
              <Button onClick={handleEditSide}>수정</Button>
            </div>
          )}
        </div>
        <div className={styles.title}>
          <Typography fontSize="xxl" fontWeight="bold" lineHeight="wider">
            {data?.title}
          </Typography>
        </div>
        <div className={styles.description}>
          <Textarea
            value={data?.summary}
            maxWidth
            placeholder="프로젝트에 대한 간단한 설명을 적어주세요!"
            disabled
          />
        </div>
        <div className={styles.info}>
          <div>
            <div className={styles.each}>
              <Button>팀원모집</Button>
              <label
                className={cn(
                  styles.teamAvailableCheckbox,
                  !data?.recruiting && styles.isRecruiting,
                )}
              >
                <Typography fontSize="xs" lineHeight="wide" textColor="gray">
                  {data?.recruiting
                    ? '팀원을 모집 중 입니다'
                    : '팀원모집을 완료했습니다.'}
                </Typography>
              </label>
            </div>
            <div className={styles.each}>
              <Button>기여자</Button>
              <div className={styles.contributors}>
                {(contributors as unknown as ContributorsType[])
                  ?.slice(0, 7)
                  ?.map((each: ContributorsType) => (
                    <a
                      key={each?.id}
                      href={each?.html_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={each?.avatar_url} alt={each?.login} />
                    </a>
                  ))}
                {(contributors as unknown as ContributorsType[])?.length >
                  8 && (
                  <a
                    href={`${githubData?.html_url}/graphs/contributors`}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.more}
                  >
                    더보기
                  </a>
                )}
              </div>
            </div>
          </div>
          <div>
            <div className={styles.each}>
              <Button>분류</Button>
              <div className="classificationGroup">
                <div className={styles.classification}>
                  {data?.categories.map((each) => (
                    <LabelTag key={each}>{each}</LabelTag>
                  ))}
                </div>
                <div className={styles.classification}>
                  {data?.organizations.map(({ id, name }) => (
                    <LabelTag key={id}>{name}</LabelTag>
                  ))}
                </div>
                <div className={styles.classification}>
                  {data?.skills.map(({ id, name }) => (
                    <LabelTag key={id}>{name}</LabelTag>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.each}>
              <Button>링크</Button>
              <div className={styles.linkGroup}>
                <div
                  className={styles.label}
                  onClick={() => window.open(data?.githubLink)}
                  aria-hidden
                >
                  <Github />
                </div>
                {/** TODO: 정규식으로 변경 */}
                {data?.serviceLink.includes('http') && (
                  <div
                    className={styles.label}
                    onClick={() => window.open(data?.serviceLink)}
                    aria-hidden
                  >
                    <RightArrow />
                    <Typography
                      fontSize="sm"
                      lineHeight="wider"
                      fontWeight="bold"
                    >
                      서비스 바로가기
                    </Typography>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.summary}>
          {(data?.detail as string) && (
            <Viewer ref={editorRef} initialValue={data?.detail} />
          )}
        </div>
        <SideMiddleSection sideId={id} />
        <SideBottomSection sideId={id} />
      </div>
      <Button
        className={styles.scrollTopButton}
        variant="floating"
        iconName="expand_less"
        onClick={handleToTop}
      />
      {isAlertVisible && (
        <AlertModal content={alertMessage} handleConfirm={hideAlert} />
      )}
    </div>
  );
};

export default SideReadPage;
